import { CartManagerFilesystem } from "./ProductManager.js";

export const cartManager = new CartManagerFilesystem(
    './src/db/cart.json'
);

//export { productManager };
