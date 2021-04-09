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

  searchByOrderId(orderId, page, limit) {
    return axios.get(
      ORDER_API + "findid/" + orderId + "/?page=" + page + "&limit=" + limit
    );
  }

  searchByStatus(status, page, limit) {
    return axios.get(
      ORDER_API +
        "findStatus/?status=" +
        status +
        "&page=" +
        page +
        "&limit=" +
        limit
    );
  }

  searchByDate(startDate, toDate, page, limit) {
    return axios.get(
      ORDER_API +
        "date/?startDate=" +
        startDate +
        "&toDate=" +
        toDate +
        "&page=" +
        page +
        "&limit=" +
        limit
    );
  }
}

export default new OrderService();
