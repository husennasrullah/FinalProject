import axios from "axios";

const ORDER_API = "http://localhost:8080/gromart/order/";

class OrderService {
  getOrderByUserID(userId, page, limit) {
    return axios.get(
      ORDER_API + "id/" + userId + "/?page=" + page + "&limit=" + limit
    );
  }

  getAllOrder(page, limit) {
    return axios.get(ORDER_API + "/?page=" + page + "&limit=" + limit);
  }

  checkoutOrder(checkout) {
    return axios.post(ORDER_API, checkout);
  }

  getOrderById(orderId) {
    return axios.get(ORDER_API + orderId);
  }

  getTopSales() {
    return axios.get(ORDER_API + "topsales/");
  }

  getTotalTransaction() {
    return axios.get(ORDER_API + "count/");
  }

  updateStatus(update) {
    return axios.put(ORDER_API + "status/", update);
  }
}

export default new OrderService();
