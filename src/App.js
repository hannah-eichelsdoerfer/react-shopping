import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';
// import { uiActions } from './store/ui-slice';

// Problem: useEffect will execute when our app starts and therefore sends emptycart t backend and overwrites the data thus far stored there
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartVisible);
  const notification = useSelector((state) => state.ui.notification);

  // Solution for async as it can not be coded in updating cart as it is in reducer
  const cart = useSelector((state) => state.cart);

  // useEffect(() => {
  // The following code was moved into cart-actions.js as Action Creator
  // const sendCartData = async () => {
  // dispatch(
  //   uiActions.showNotification({
  //     status: 'pending',
  //     title: 'Sending...',
  //     message: 'Sending cart data!',
  //   })
  // );

  // const response = await fetch(
  //   'https://react-redux-shopping-36f8f-default-rtdb.firebaseio.com/cart.json',
  //   { method: 'PUT', body: JSON.stringify(cart) } // a PUT request will overwrite existing data
  // );

  // if (!response.ok) throw new Error('Sending cart data failed');

  // dispatch(
  //   uiActions.showNotification({
  //     status: 'success',
  //     title: 'Success!',
  //     message: 'Sending cart successfull!',
  //   })
  // );
  // };

  // if (isInitial) {
  //   isInitial = false;
  //   return;
  // }

  // sendCartData().catch((error) => {
  // dispatch(
  //   uiActions.showNotification({
  //     status: 'error',
  //     title: 'Error X',
  //     message: 'Sending cart failed!',
  //   })
  // );
  // });
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]); // will render only the first time the app loads (because it has no denpendencies - dispatch will never change, so this effect will never re-run)

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) dispatch(sendCartData(cart)); // dispatching a function that returns another function ( so far we have always dispatched action creators so functions that return an action with a type and so on ) - Redux Toolkit is prepeared for that
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
