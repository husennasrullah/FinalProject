import axios from "axios";

const CART_API = "http://localhost:8080/gromart/cart/";

class CartService {
  getCartByUserID(userId) {
    return axios.get(CART_API + "id/" + userId);
  }
}
export default new CartService();
