import mongoose from "mongoose";

const Schema = mongoose.Schema;



const cartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

const cartsModel = mongoose.model("Cart", cartSchema);

export default cartsModel;