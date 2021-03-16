import axios from "axios";


const PRODUCT_API = "http://localhost:8080/gromart/product/";
class ProductService {
  getProduct() {
    return axios.get(PRODUCT_API);
  }

  getProductPaging(page, limit) {
    return axios.get(PRODUCT_API + "paging/?page=" + page + "&limit=" + limit);
  }

  getCount() {
    return axios.get(PRODUCT_API + "count/");
  }

  createProduct(product) {
    return axios.post(PRODUCT_API, product);
  }

  getProductById(productId) {
    return axios.get(PRODUCT_API + productId);
  }

  searchById(productId) {
    return axios.get(PRODUCT_API + "id/" + productId);
  }

  searchByName(productName) {
    return axios.get(PRODUCT_API + "name/" + productName);
  }

  updateProduct(product, productId) {
    return axios.put(PRODUCT_API + productId, product);
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCT_API + productId);
  }
}

export default new ProductService();
