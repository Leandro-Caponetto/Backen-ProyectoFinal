import { ProductManager } from "./productsManager.js";
import { CartManager } from "./cart_manager.js";

const ProductsManager = new ProductManager();
const CartsManager = new CartManager();

export default {
  ProductsManager,
  CartsManager,
};