import { Router } from 'express'
import mongoose from 'mongoose'
import productModel from '../dao/models/productos.model.js'

const router = Router()


router.get('/chat', async (req, res) => {
    res.render('chat', {})
})


router.post('/chat', async (req, res) => {
    const productNew = req.body
    console.log(productNew);

    const productGenerated = new pokeModel(productNew);
    await productGenerated.save();

    console.log(productGenerated);

    res.redirect('/product/' + productGenerated.title)
})


router.get('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const deleted = await productModel.deleteOne({ _id: id })

    console.log(deleted);

    res.redirect('/product')
})

router.get('/create', async (req, res) => {
    res.render('create', {})
})


router.post('/create', async (req, res) => {
    const productNew = req.body
    console.log(productNew);

    const productGenerated = new pokeModel(productNew);
    await productGenerated.save();

    console.log(productGenerated);

    res.redirect('/product/' + productGenerated.title)
})




router.get('/:title', async (req, res) => {
    const title = req.params.title

    const product = await productModel.findOne({title: title}).lean().exec()

    res.render('one', { product })
})



router.get('/', async(req, res) => {
    const productos = await productModel.find().lean().exec()
    
    res.render('index', {
        productos
    })
})








export default router