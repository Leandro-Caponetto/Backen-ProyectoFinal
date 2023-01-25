import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "Productos";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: Boolean,
  stock: {
    type: Number,
    index: true,
  },
  category: {
    type: String,
    index: true,
  },
  photo: {
    type: [String],
    default: [],
  },
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