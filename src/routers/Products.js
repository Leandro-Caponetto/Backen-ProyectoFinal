import { Router } from "express";

import { ERRORS } from '../const/errors.js';




const router = Router()
const products = []

router.get('/', async (req, res) => {

    try {
            const { limit} = req.query


        const allProducts = await productManager.getProducts();

        if(!limit || limit < 1) {
            return res.send({success: true, products: allProducts});
        }

        //const products = allProducts.slice(skip ?? 0, limit + skip);
        const products = allProducts.slice( 0, limit );
        
        res.send({success: true, products});
    } catch (error) {
        console.log(error);

        res.send({success: false, error: "Ha ocurrido un error"})
    }

});

router.get('/:id', async (req, res) =>{
    try {
        const { id: paramId } = req.params;

        const id = Number(paramId);

        if(Number.isNaN(id) || id < 0){
            return res.send({
                success: false,
                error: "El id debe ser un número valido",
            })
        }

       const product = await productManager.getProducById(id);

       if(!product){
        return res.send({success: false, error: "Producto no encontrado" });
       }

       res.send({ success: true, products });

    } catch (error) {
        console.log(error);

        res.send({ success: false, error: "Ha ocurrido un error" });
    }
})

router.post('/', async (req, res) =>{
    try {
        const {title, description, price, code } = req.body;

        if(!title || !description || !price || !code ){
            return res.send({success: false,
            error: "Las variables son obligatorias",
            });
        }

       const saveProduct = await postMessage.saveProduct({
         title, 
         description,
         price, 
         code,
        });

       res.send({success: true, product: saveProduct});

    } catch (error) {
        console.log(error);

        if(error.name === ERRORS.VALIDATION_ERROR){
            return res.send({
                success: false,
                error: `${error.name}: ${error.message}`,
            })
        }

        res.send({success: false, error: "Ha ocurrido un error"})
    }
})

router.put('/:id', async(req, res) => {
    try {
        const {id: paramId} = req.params;

        const id = Number(paramId);

        if(Number.isNaN(id) || id < 0){
            return res.send({
                success: false,
                 error: "El id debe ser un número valido",
            });
        }
            const {title, description, price, code } = req.body;

          const updatedProduct =  await productManager.update(id, {
            title,
             description,
              price,
               code
            });


            res.send({success: true, product: updatedProduct});

        

    } catch (error) {
        console.log(error);

        if(error.name === ERRORS.NOT_FOUND_ERROR ){
           return res.send({success: false, error: `${error.name}: ${error.message}`}) 
        }
        res.send({success: false, error: "Ha ocurrido un error"});
    }
})


router.delete('/:id', async( req, res) => {
    try {

        const { id: paramId } = req.params;

        const id = Number(paramId);

        if(Number.isNaN(id) || id < 0){
            return res.send({
                success: false,
                 error: "El id debe ser un número valido",
            });
        }    

       const deletedProduct = await productManager.deleteProduct(id);

       res.send({success: true,  deleted: deletedProduct})

    } catch (error) {

        console.log(error);

        if(error.name === ERRORS.NOT_FOUND_ERROR){
            return res.send({success: false, error: `${error.name}: ${error.message}`})
        }
        res.send({success: false, error: "Ha ocurrido un error"})
        
    }
})
export { router as ProductsRouter };