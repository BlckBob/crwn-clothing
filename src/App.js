import { Route, Switch } from 'react-router';

import './App.css';

import Header from './components/header/header.comp';
import HomePage from './pages/homepage/homepage.comp';
import ShopPage from './pages/shop/shop.comp';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.comp';

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUp} />
      </Switch>
    </div>
  );
}

export default App;
