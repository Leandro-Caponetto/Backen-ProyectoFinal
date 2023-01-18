import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productCollection = 'productos'

const productSchema = new mongoose.Schema({
    id:Number,
    title: String,
    category: String,
    price: Number,
    description: String,
    photo: String
})
productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel