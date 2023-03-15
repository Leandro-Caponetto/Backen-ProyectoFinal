import { Router } from "express";
import { generateProducts } from "../mocking/Mocking.js";



const router = Router()

//Mockingproducts
router.get('/', async(req, res) => {
    const products = []

    for (let i = 0; i < 100; i++) {
        products.push(generateProducts())
    }


    res.send({status: "success", payload: products})
})

export default router