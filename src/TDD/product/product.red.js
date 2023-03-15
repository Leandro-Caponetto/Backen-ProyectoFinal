import { ProductService } from "../repository/index.js"



get("/", async (req, res) => {
    const products = await ProductService.get()
    const limit = req.query.limit || 5
    
    res.json(products.slice(0, parseInt(limit)))
    
})

get("/view", async (req, res) => {
    const products = await ProductService.get()
    res.render('realTimeProducts', {
        data: products
    })
})
get("/:id", async (req, res) => {
    const id = req.params.id
    const product = await ProductService.find({_id: id})
    res.json({
        product
    })
})

delete("/:pid", async (req, res) => {
    const id = req.params.pid
    const productDeleted = await ProductService.delete({_id: id})

    req.io.emit('updatedProducts', await ProductService.get());
    res.json({
        status: "Success",
        massage: "Product Deleted!",
        productDeleted
    })
})

post("/", async (req, res) => {
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

put("/:pid", async (req, res) => {
    const id = req.params.pid
    const productToUpdate = req.body

    const product = await ProductService.update({
        _id: id
    }, productToUpdate)
    req.io.emit('updatedProducts', await ProductService.get());
    res.json({
        status: "Success",
        product
    })
})





//delet
get('/delete/:id', async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id)
    const deleted = await ProductService.delete({ _id: id })

    console.log(deleted);

    res.redirect('products/product')
})

//create
get('/create', async (req, res) => {
    res.render('products/create', {})
})

post('/create', async (req, res) => {
    const productNew = req.body
    console.log(productNew);

    const productGenerated = new ProductService(productNew);
    await productGenerated.save();

    console.log(productGenerated);

    res.redirect('products/product/' + productGenerated.title)
})
//one

get('/:title', async (req, res) => {
    const title = req.params.title

    const product = await ProductService.findOne({title: title})

    res.render('products/one', { product })
})



get('/', async(req, res) => {
    const productos = await ProductService.find()
    
    res.render('products/index', {
        productos
    })
})
