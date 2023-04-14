import mongoose from "mongoose";
import User from "../src/DAO/file/users.file.js";
import assert from 'assert';

mongoose.connect('mongodb://127.0.0.1:27017')

describe('Testing Users Dao', ()=>{

    before(function(){
        mongoose.connection.collections.users.drop()
        this.timeout()
    })

    beforeEach(function() {
        mongoose.connection.collections.users.drop()
        this.timeout()
    })

    it('El dao debe poder obtener los usuarios', async () => {
        const usersDao = new User()
        const result = await usersDao.get()

        assert.strictEqual(Array.isArray(result), true)
        
        
    })

    it('El dao debe poder crear los usuarios', async () => {
        let mockUser = {
            first_name: 'Leandro',
            last_name: 'Caponetto',
            email: 'leandro@gamil.com',
            password: '1234'
        }
        
        const usersDao = new User()
        const result = await usersDao.save(mockUser)

        assert.ok(result._id)
    })
    it('El dao debe poder crear los usuarios con una lista de productos', async () => {
        let mockUser = {
            first_name: 'Leandro',
            last_name: 'Caponetto',
            email: 'leandro@gamil.com',
            password: '1234'
        }
        
        const usersDao = new User()
        const result = await usersDao.save(mockUser)

        assert.deepStrictEqual(result.product, [])
    })
    it('El dao debe poder busca por email', async () => {
        let mockUser = {
            first_name: 'Leandro',
            last_name: 'Caponetto',
            email: 'caponetto@gamil.com',
            password: '1234'
        }
        
        const usersDao = new User()
        const result = await usersDao.save(mockUser)

        const user = await usersDao.getBy({email: result.email})

        assert.strictEqual(typeof user, 'object')
    })
})