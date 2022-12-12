import express from 'express';


import { ProductsRouter} from './routers/index.js';




const app = express();


const PORT = 8080;

app.use(express.json())  //obligatorios
app.use(express.urlencoded({extended: true}))  //obligatórios

app.use(express.static('public'))



app.use('/api/products', ProductsRouter)
//app.use('/api/carts', CartRouter)
app.use('/', (req, res) => res.send('Home'))











app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



