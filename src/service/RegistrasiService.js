import axios from "axios";

const REGISTRASI_API = "http://localhost:8080/gromart/user/";
class RegistrasiService {
  getUser() {
    return axios.get(REGISTRASI_API);
  }

  getBuyerPaging(page, limit) {
    return axios.get(
      REGISTRASI_API + "paging/?page=" + page + "&limit=" + limit
    );
  }

  getBuyer() {
    return axios.get(REGISTRASI_API + "buyer/");
  }

  searchID(productId) {
    return axios.get(REGISTRASI_API + "id/" + productId);
  }

  searchName(productName) {
    return axios.get(REGISTRASI_API + "name/" + productName);
  }

  getCount() {
    return axios.get(REGISTRASI_API + "count/");
  }

  createUser(user) {
    return axios.post(REGISTRASI_API, user);
  }

  updateLimit(update, userId) {
    return axios.put(REGISTRASI_API + "limit/" + userId, update);
  }

  loginCheck(user, pass) {
    return axios.get(
      REGISTRASI_API +
        "login/?userName=" +
        `${encodeURIComponent(user)} ` +
        "&password=" +
        `${encodeURIComponent(pass)}`
    );
  }
}

export default new RegistrasiService();
