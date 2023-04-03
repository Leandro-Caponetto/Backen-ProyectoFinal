import { Router } from "express";
//import { generateUser } from "../utils.user.js";
import { get, create, addTicket, reminderTickets } from '../controller/users.controller.js'


const router = Router()
/*
router.get('/', async(req, res) => {
    const users = []

    for (let i = 0; i < 100; i++) {
        users.push(generateUser())
    }


    res.send({status: "success", payload: users})
})
*/

router.get('/', get)
router.get('/reminder/:userID', reminderTickets)
router.post('/', create)
router.put('/add', addTicket)


export default router