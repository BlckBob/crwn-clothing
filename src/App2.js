import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import './App.css';

import Header from './components/header/header.comp';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import HomePage from './pages/homepage/homepage.comp';
import ShopPage from './pages/shop/shop.comp';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.comp';
import { setCurrentUser } from './redux/user/user.actions';

function App() {
  // let unsubscribeFromAuth = null;
  // const currentUser = useAuthUser();
  // console.log(currentUser);

  useEffect(() => {
    // const { setCurrentUser } = props;
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div>
      <Header /* currentUser={currentUser} */ />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUp} />
      </Switch>
    </div>
  );
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// });

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
