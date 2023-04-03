import config from '../config/config.js'
import mongoose from 'mongoose'

export let Cart
export let Message
export let Product
export let User
export let Ticket


switch (config.persistence) {
    case 'FILE':
        console.log('using files...');

        const { default: ProductFile } = await import('./file/products.file.js')
        const { default: MessageFile } = await import('./file/messages.file.js')
        const { default: UserFile } = await import('./file/users.file.js')
        const { default: CartFile } = await import('./file/cart.file.js')
        const { default: TicketFile } = await import('./file/tickets.file.js')

        Product = ProductFile
        Message = MessageFile
        User = UserFile
        Cart = CartFile
        Ticket = TicketFile

        break
        case 'MONGO':
        console.log('connecting mongo...');

        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.mongoDbName,

        }, () => console.log('Mongo connected'))

        const { default: ProductMongo } = await import('./mongo/products.mongo.js')
        const { default: MessageMongo } = await import('./mongo/messages.mongo.js')
        const { default: UserMongo } = await import('./mongo/users.mongo.js')
        const { default: CartMongo } = await import('./mongo/cart.mongo.js')
        const { default: TicketMongo } = await import('./mongo/tickets.mongo.js')

        Product = ProductMongo
        Message = MessageMongo
        User = UserMongo
        Cart = CartMongo
        Ticket = TicketMongo
        
        break

     
    default:
        console.log('Memory Persistence');
        const { default: ContactsMemory } = await import('./memory/contacts.memory.js')
        Contacts = ContactsMemory

        break   
}