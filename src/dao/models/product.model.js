import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "Productos";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
});

mongoosePaginate.paginate.options = {
  limit: 10,
  page: 1,
  sort: { price: 1 },
  lean: true,
};

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

export default productModel;