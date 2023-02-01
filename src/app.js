import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import __dirname from './utils.js'


import productRouter from './routes/productapi.router.js'
import productViews from './routes/productviews.router.js'
import cartViews from './routes/cartsRuter.js'
import sessionRouter from './routes/sessions.router.js'
import jwtRouter from './routes/jwt.router.js'
import morgan from 'morgan'


const app = express()
const dbName = "myCompany"
const MONGO_URI  = 'mongodb+srv://Leandro:t5wd0zdel8BQR2EB@cluster0.rdltew3.mongodb.net/?retryWrites=true&w=majority'

// Configuramos el motor de plantillas
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Configurar Session
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        dbName,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 30
    }),
    secret: '123456',
    resave: true,
    saveUninitialized: true
}))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

function auth(req, res, next) {
    if(req.session.user) return next()

    return res.status(401).render('errors/base', {error: 'No authenticado'})
}

app.get('/', (req, res) => res.send('OK'))
app.get('/private', auth, (req, res) => {
    res.json(req.session.user)
})
app.use('/session', sessionRouter)
app.use('/jwt', jwtRouter)


// Para traer la informacion de post como JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// Configuramos la carpeta publica
app.use(express.static( __dirname + '/public'))

// Configuramos las rutas 
app.use('/product', productViews)
app.use('/session', sessionRouter)
app.use('/api/product', productRouter)
app.use('/cart', cartViews)


app.get('/', (req, res) => { res.send('Work great!') })


// Conexion a DB Mongo Atlas
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
