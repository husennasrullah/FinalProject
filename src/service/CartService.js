import axios from "axios";

const CART_API = "http://localhost:8080/gromart/cart/";

class CartService {
  getCartByUserID(userId) {
    return axios.get(CART_API + "id/" + userId);
  }

  deleteItem(cartId, detailId) {
    return axios.delete(
      CART_API + "item/?cartId=" + cartId + "&detailId=" + detailId
    );
  }

  addToCart(userId, productId, addToCart) {
    return axios.post(
      CART_API + "add/?userId=" + userId + "&productId=" + productId,
      addToCart
    );
  }

  // addToCart(userId, addToCart) {
  //   return axios.post(CART_API + "add/" + userId, addToCart);
  // }

  deleteCart() {}

  addItem() {}
}
export default new CartService();
