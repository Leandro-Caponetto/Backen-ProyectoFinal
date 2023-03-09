import { Router } from "express";
import passport from "passport";
import config from "../config/config.js";


const router = Router()

// REGISTER
router.get('/register', (req, res) => {
    res.render('sessions/register')
})
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/error' }), (req, res) => {
    res.redirect('/')
})

// LOGIN
router.get('/login', (req, res) => {
    res.render('sessions/login')
})
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/error' }), (req, res) => {
    if (!req.user) {
        return res.status(400).render('errors/base', { error: 'Invalid credentials' })
    }

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
        age: req.user.age,
        role: req.user.role,
        social: req.user.social
    }
    
    res.cookie(config.jwtCookieName, req.user.token).redirect('/')
})

//LOGOUT
router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).render('errors/base', { error: err })

        res.clearCookie(config.jwtCookieName).redirect('/')
    })
})

router.get('/error', async (req, res) => {
    return res.status(500).render('errors/base', { error: "Error session" })
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