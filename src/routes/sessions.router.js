const express = require('express')

const router = express.Router()

const User = require('../models/user')

router.get("/register", (req, res)=>{
    res.render('register')
})

router.post("/register", async (req, res) => {
    try {
        if( !req.session.first_name || !req.session.last_name || !req.session.email ){
            const { first_name, last_name, email, age, password } = req.body
    
            const user = new User({ first_name, last_name, email, age, password })
            
            req.session.first_name = first_name
            req.session.last_name = last_name
            req.session.email = email
            req.session.age = age
            req.session.password = password
            res.redirect("/api/sessions/login")
        }else{
            res.send('Ya está logueado')
        }
        

    } catch (error) {
        res.status(500).send("Error de registro")
    }
})


router.get("/login", (req, res)=>{
    res.render('login')
})

router.post("/login", async(req, res)=>{
    try{
        const { email, password } = req.body
        if(email !== req.session.email || password !== req.session.password){
            return res.send('login failed')
        }   
        res.redirect("/profile")
    }catch(error){
        res.status(500).send("Error de login")
    }
})


module.exports = router