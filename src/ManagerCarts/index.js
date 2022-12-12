import { CartManagerFilesystem } from "./CartManager.js";

export const cartManager = new CartManagerFilesystem(
    './src/db/cart.json'
);

