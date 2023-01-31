import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import   bcrypt  from  'bcrypt-nodejs'

const trainerCollection = 'trainers'

const trainerSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    first_name: String,
    last_name: String,
    age: Number,
    password: String
})
trainerSchema.methods.ecryptPassword = (password) => {
   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

trainerSchema.methods.comparePassword = function (password) {
   return bcrypt.compareSync(password, this.password)
}

trainerSchema.plugin(mongoosePaginate)
const trainerModel = mongoose.model(trainerCollection, trainerSchema)

export default trainerModel