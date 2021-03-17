import axios from "axios";

const CART_API = "http://localhost:8080/gromart/cart/";

class CartService {
  getCartByUserID(userId) {
    return axios.get(CART_API + "id/" + userId);
  }

  deleteItem(detailId) {
    return axios.delete(CART_API + "detail/" + detailId);
  }

  addToCart(userId, addToCart) {
    return axios.post(CART_API + "add/" + userId, addToCart);
  }

  deleteCart() {}

  addItem() {}
}
export default new CartService();
