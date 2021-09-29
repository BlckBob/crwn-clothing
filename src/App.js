import { Route, Switch } from 'react-router';

import './App.css';

import HomePage from './pages/homepage/homepage.comp';
import ShopPage from './pages/shop/shop.comp';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
