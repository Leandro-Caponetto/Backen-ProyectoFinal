import {Router} from "express"
import { ProductService } from "../repository/index.js"



const router = Router()

router.get("/", async (req, res) => {
    const products = await ProductService.get()
    const limit = req.query.limit || 5
    
    res.json(products.slice(0, parseInt(limit)))
    
})


router.get("/view", async (req, res) => {
    const products = await ProductService.get()
    res.render('realTimeProducts', {
        data: products
    })
})

router.get("/:id", async (req, res) => {
    const id = req.params.id
    const product = await ProductService.findOne({_id: id})
    res.json({
        product
    })
})

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid
    const productDeleted = await ProductService.deleteOne({_id: id})

    req.io.emit('updatedProducts', await ProductService.get());
    res.json({
        status: "Success",
        massage: "Product Deleted!",
        productDeleted
    })
})

router.post("/", async (req, res) => {
    try {
        const product = req.body
        if (!product.title) {
            return res.status(400).json({
                message: "Error Falta el nombre del producto"
            })
        }
        const productAdded = await ProductService.add(product)
        req.io.emit('updatedProducts', await ProductService.get());
        res.json({
            status: "Success",
            productAdded
        })
    } catch (error) {
        console.log(error)
        res.json({
            error
        })
    }
})

router.put("/:pid", async (req, res) => {
    const id = req.params.pid
    const productToUpdate = req.body

    const product = await ProductService.updateOne({
        _id: id
    }, productToUpdate)
    req.io.emit('updatedProducts', await ProductService.get());
    res.json({
        status: "Success",
        product
    })
})





//delet
router.get('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const deleted = await ProductService.deleteOne({ _id: id })

    console.log(deleted);

    res.redirect('products/product')
})

//create
router.get('/create', async (req, res) => {
    res.render('products/create', {})
})

router.post('/create', async (req, res) => {
    const productNew = req.body
    console.log(productNew);

    const productGenerated = new ProductService(productNew);
    await productGenerated.save();

    console.log(productGenerated);

    res.redirect('products/product/' + productGenerated.title)
})
//one

router.get('/:title', async (req, res) => {
    const title = req.params.title

    const product = await ProductService.findOne({title: title}).lean().exec()

    res.render('products/one', { product })
})



router.get('/', async(req, res) => {
    const productos = await ProductService.find().lean().exec()
    
    res.render('products/index', {
        productos
    })
})





export default router