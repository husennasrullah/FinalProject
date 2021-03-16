import axios from "axios";

const SHIPPING_API = "http://localhost:8080/gromart/shipping/";

class ShippingService {
  getShipping() {
    return axios.get(SHIPPING_API);
  }
}
export default new ShippingService();
