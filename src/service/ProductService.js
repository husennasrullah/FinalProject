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

  searchById(productId, page, limit) {
    return axios.get(
      PRODUCT_API + "findid/" + productId + "/?page=" + page + "&limit=" + limit
    );
  }

  searchByName(productName, page, limit) {
    return axios.get(
      PRODUCT_API +
        "findname/" +
        productName +
        "/?page=" +
        page +
        "&limit=" +
        limit
    );
  }

  updateProduct(product, productId) {
    return axios.put(PRODUCT_API + productId, product);
  }

  deleteProduct(productId) {
    return axios.delete(PRODUCT_API + productId);
  }
}

export default new ProductService();
