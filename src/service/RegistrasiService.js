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

  getBuyerByID(userId) {
    return axios.get(REGISTRASI_API + userId);
  }

  searchID(userId, page, limit) {
    return axios.get(
      REGISTRASI_API + "findid/" + userId + "/?page=" + page + "&limit=" + limit
    );
  }

  searchName(name, page, limit) {
    return axios.get(
      REGISTRASI_API + "findname/" + name + "/?page=" + page + "&limit=" + limit
    );
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
    // return axios.get(REGISTRASI_API +"login/?userName=" +`${encodeURIComponent(user)} ` +"&password=" +`${encodeURIComponent(pass)}`);
    return axios.get(
      REGISTRASI_API + "login/?userName=" + user + "&password=" + pass
    );
  }
}

export default new RegistrasiService();
