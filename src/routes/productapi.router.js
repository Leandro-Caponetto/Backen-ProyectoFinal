import { Router } from 'express'
import productModel from '../dao/models/productos.model.js'


const router = Router()


router.get('/', async (req, res) => {
    const productos = await productModel.find()

    res.json(productos)
})

router.post('/', async (req, res) => {
    const result = await productModel.create(req.body)

    res.json(result)
})

export default router