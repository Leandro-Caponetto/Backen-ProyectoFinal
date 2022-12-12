import { Router } from "express";

//import { ERRORS } from './const/errors.js';



const router = Router()
const carts = []

/*router.get('/', async (req, res) => {

    try {
            const { limit} = req.query


        const allProducts = await cartManager.getProducts();

        if(!limit || limit < 1) {
            return res.send({success: true, carts: allProducts});
        }

        //const products = allProducts.slice(skip ?? 0, limit + skip);
        const carts = allProducts.slice( 0, limit );
        
        res.send({success: true, carts});
    } catch (error) {
        console.log(error);

        res.send({success: false, error: "Ha ocurrido un error"})
    }

});*/

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

       const cart = await cartManager.getProducById(id);

       if(!cart){
        return res.send({success: false, error: "Producto no encontrado" });
       }

       res.send({ success: true, carts });

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

       const saveCart = await postMessage.saveCart({
         title, 
         description,
         price, 
         code,
        });

       res.send({success: true, cart: saveCart});

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

          const updatedCart =  await cartManager.update(id, {
            title,
             description,
              price,
               code
            });


            res.send({success: true, cart: updatedCart});

        

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

       const deletedCart = await cartManager.deleteProduct(id);

       res.send({success: true,  deleted: deletedCart})

    } catch (error) {

        console.log(error);

        if(error.name === ERRORS.NOT_FOUND_ERROR){
            return res.send({success: false, error: `${error.name}: ${error.message}`})
        }
        res.send({success: false, error: "Ha ocurrido un error"})
        
    }
})
export { router as CartRouter };