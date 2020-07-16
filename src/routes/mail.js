const {Router} = require('express')
const app = express.Router()
const nodemailer = requiere('nodemailer')

app.post('/send-email', (req,res)=>{
    const {name, email, message} = req.body 
    
})

module.exports = {
    app
}