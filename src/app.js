import express from 'express';

import productsRouter from './routers/products.router.js'
import cartRouter from './routers/cart.router.js'




const app = express();


app.use(express.json())  //obligatorios
app.use(express.urlencoded({extended: true}))  //obligatórios

app.use(express.static('public'))



app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/', (req, res) => res.send('Home'))





const PORT = 8080;





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



