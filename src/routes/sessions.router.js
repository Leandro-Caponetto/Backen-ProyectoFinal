import { Router } from 'express'
import passport from 'passport'
import trainerModel from '../dao/models/trainer.model.js'


const router = Router()

router.get('/logins', (req, res) => {
    res.render('logins')
})

// Vista para registrar entrenadores
router.get('/register', async (req, res) => {
    res.render('session/register', {})
})

// Api para crear entrenadores
router.post('/create', async (req, res) => {
    const trainerNew = req.body
    console.log(trainerNew);

    const trainer = new trainerModel(trainerNew);
    await trainer.save();

    res.redirect('/session/login')
})

// Vista de login
router.get('/login', async (req, res) => {
    res.render('session/login', {})
})

// Api de Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const trainer = await trainerModel.findOne({email, password}).lean().exec()
    if(!trainer) {
        return res.status(401).render('errors/base', { error: 'Error en username y/o password'})
    }


    req.session.user = trainer
    //req.session.user.rol = (username == 'admin') ? 'admin' : 'user'

    res.redirect('/product/')
})

// Api de Logout
router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
            res.status(500).render('errors/base', { error: err })
        } else res.redirect('/session/login')
    })

    
})


//-----------github----------------
router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email']}),
    async (req, res) => {}
)

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/session/login'}),
    async(req, res) => {
        console.log("Callback: ", req.user);
        req.session.user = req.user
        console.log(req.session);
        res.redirect('/product')
    }
)
//-------------google--------------
router.get(
    '/login-google',
    passport.authenticate('google', {scope: ['email', 'profile']}),
    async (req, res) => {}
)

router.get(
    '/googlecallback',
    passport.authenticate('google', {failureRedirect: '/session/login'}),
    async(req, res) => {
        console.log("Callback Google: ", req.user);
        req.session.user = req.user
        console.log(req.session);
        res.redirect('/product')
    }
)



export default router