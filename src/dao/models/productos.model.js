import mongoose from 'mongoose'

const productCollection = 'productos'

const productSchema = new mongoose.Schema({
    id:Number,
    title: String,
    category: String,
    price: Number,
    description: String,
    photo: String
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel