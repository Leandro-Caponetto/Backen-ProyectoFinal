import { Router } from 'express'
import mongoose from 'mongoose'
import productModel from '../dao/models/productos.model.js'

const router = Router()



//chat
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


// Lista todos los productos
router.get('/table', async (req, res) => {

    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    // sort en field y elegir (asc o desc)
    
    const filter = req.query?.query || req.body?.query || ""

    const search = {}
    if(filter) {
        search["$or"] = [
            {title: {$regex: filter }},// Expresiones Regulares
            {category: {$regex: filter }}
        ]
    }
    const options = {page, limit, lean: true}

    const result = await productModel.paginate(search, options)
    
    console.log(result);

    res.render('index', {
        result,
        query: filter
    })
})




//delet
router.get('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const deleted = await productModel.deleteOne({ _id: id })

    console.log(deleted);

    res.redirect('/product')
})

router.get('/create', async (req, res) => {
    res.render('create', {})
})

//create
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