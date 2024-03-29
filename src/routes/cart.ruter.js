import { Router } from "express"
import { CartService } from "../repository/index.js"

const router = Router()

router.get("/", async (req, res) => {
    const carts = await CartService.get()
    res.json({ carts })
})

router.post("/", async (req, res) => {
    const newCart = await CartService.add({})

    res.json({status: "Success", newCart})
})

router.delete("/:cid/product/:pid", async (req, res) => {
     const cartID = req.params.cid
     const productID = req.params.pid

     const cart = await cartModel.findById(cartID)
     if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})

     const productIDX = cart.products.findIndex(p => p.id == productID)
    
     if (productIDX <= 0) return res.status(404).json({status: "error", error: "Product Not Found on Cart"})

    cart.products = cart.products.splice(productIDX, 1)
     await cart.save()
    
     res.json({status: "Success", cart})
 })

 router.post("/:cid/product/:pid", async (req, res) => {
     const cartID = req.params.cid
     const productID = req.params.pid
     const quantity= req.body.quantity || 1
     const cart = await cartModel.findById(cartID)

     let found = false
     for (let i = 0; i < cart.products.length; i++) {
         if (cart.products[i].id == productID) {
            cart.products[i].quantity++
            found = true
           break
         }
     }
     if (found == false) {
         cart.products.push({ id: productID, quantity})
     }

     await cart.save()


     res.json({status: "Success", cart})
 })

export default router