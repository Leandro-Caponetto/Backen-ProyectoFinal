import express from 'express'
import __dirname from './utils.js'
import productRouter from './routes/productapi.router.js'
import productViews from './routes/productviews.router.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { Server } from 'socket.io'

const app = express()

// Para traer la informacion de post como JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Configuramos el motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// Configuramos la carpeta publica
app.use(express.static( __dirname + '/public'))

// Configuramos las rutas 
app.use('/product', productViews)
app.use('/api/product', productRouter)

app.get('/', (req, res) => { res.send('Work great!') })


// Conexion a DB Mongo Atlas
const MONGO_URI  = 'mongodb+srv://Leandro:t5wd0zdel8BQR2EB@cluster0.rdltew3.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery', false) 
mongoose.connect(MONGO_URI, error => {
    if(error) {
        console.error('No se pudo conectar a la DB');
        return
    }

    console.log('DB connected!');
    const httpServer = app.listen(8080, () => console.log('Server listenming...'))
    
    const io = new  Server(httpServer)

    app.use('/', productViews)


    let messages = []
    io.on('connection', socket => {
        console.log('New client connected');

        // Escucha los mensajes de un user
        socket.on('message', data => {
            messages.push(data) // Guardamos el mensaje

            // Emitimos el mensaje para los demas
            io.emit('messageLogs', messages)
        })
    })
})
