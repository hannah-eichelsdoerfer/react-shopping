import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://react-redux-shopping-36f8f-default-rtdb.firebaseio.com/cart.json'
      ); // get request is the default so method does not need to be specified

      if (!response.ok) throw new Error('Could not fetch cart data!');

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          quantity: cartData.quantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

// Action Creator (pulling everything out of App.js useEffect)
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://react-redux-shopping-36f8f-default-rtdb.firebaseio.com/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) } // a PUT request will overwrite existing data (sending our data snapshot to firebase and it will take it and store it like it is, instead of with post in a list, therefore we have the correct structure when fetching it)
      );

      if (!response.ok) throw new Error('Sending cart data failed');
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sending cart successfull!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error X',
          message: 'Sending cart failed!',
        })
      );
    }
  };
};
