import axios from "axios";

const REGISTRASI_API = "http://localhost:8080/gromart/user/";
class RegistrasiService {
  getUser() {
    return axios.get(REGISTRASI_API);
  }

  getBuyer() {
    return axios.get(REGISTRASI_API + "buyer/");
  }

  createUser(user) {
    return axios.post(REGISTRASI_API, user);
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
