import passport from 'passport'
import local from 'passport-local'
import UserModel from '../dao/models/user.model.js'
import GitHubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oauth2'
import { createHash, isValidPassoword } from '../utils.js'



passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async(id, done) => {
   const user = await UserModel.findById(id);
   done(null, user);
})

const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use('google', new GoogleStrategy(
        {
            clientID: "448136707309-5jic0em5vrso920hma9aip8jj0gtsm42.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://localhost:8080/session/googlecallback",
            passReqToCallback: true
        },
        async(request, accessToken, refreshToken, profile, done) => {
            console.log(profile);

            try {
                const user = await UserModel.findOne({email: profile._json.email})
                if(user) {
                    console.log('User already exits');
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name,
                    email: profile._json.email,
                    password: ''
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('error to login with github' + error)
            }
        }
    ))

    passport.use('github', new GitHubStrategy(
        {
            clientID: "Iv1.9bee3c4bcd9f3923",
            clientSecret: "0f9b1c6cc4fd16b7ffe39987d1c480c6edae7153",
            callbackURL: "http://localhost:8080/session/githubcallback"
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log(profile);

            try {
                const user = await UserModel.findOne({email: profile._json.email})
                if(user) {
                    console.log('User already exits');
                    return done(null, user)
                }

                const newUser = {
                    first_name: profile._json.name,
                    last_name: "",
                    email: profile._json.email,
                    password: ''
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('error to login with github' + error)
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            const {first_name, last_name, email } = req.query
            try {
                const user = await UserModel.findOne({email: username})
                if(user) {
                    console.log('User already exits');
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password)
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done("Error to register " + error)
            }
        }
    ))

    passport.use('login', new LocalStrategy(
        { usernameField: 'email'},
        async(username, password, done) => {
            try {
                const user = await UserModel.findOne({email: username}).lean().exec()
                if(!user) {
                    console.error('User donst exist');
                    return done(null, false)
                }

                if(!isValidPassoword(user, password)) return done(null, false)

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))
    
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })

}

export default initializePassport