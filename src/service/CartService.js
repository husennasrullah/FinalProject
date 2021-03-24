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

  deleteAllCart(cartId) {
    return axios.delete(CART_API + cartId);
  }

  addToCart(userId, productId, addToCart) {
    return axios.post(
      CART_API + "add/?userId=" + userId + "&productId=" + productId,
      addToCart
    );
  }

  updateQuantity(detailId, update) {
    return axios.put(CART_API + "qty/" + detailId, update);
  }
}
export default new CartService();
