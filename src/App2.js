import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import Header from './components/header/header.comp';
import HomePage from './pages/homepage/homepage.comp';
import ShopPage from './pages/shop/shop.comp';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.comp';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

function App() {
  const currentUser = useAuthUser();
  // console.log(currentUser);

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUp} />
      </Switch>
    </div>
  );
}

export default App;

function useAuthUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // no need for ref here
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // setUser(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          console.log(user);
        });
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user; // return authenticated user
}
