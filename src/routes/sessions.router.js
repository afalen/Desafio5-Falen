const express = require('express')

const router = express.Router()

const usuario = require('../models/user.model')

router.get("/login", async (req, res) => {
    res.render("login")
})

router.get("/register", async (req, res) => {
    res.render("register")
})

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;


    if (!first_name || !last_name || !email || !age || !password) {
        return res.status(400).send('Faltan datos.');
    }

    const user = await usuario.create({
        first_name,
        last_name,
        email,
        age,
        password,
        role: "usuario"
    });

    console.log('Usuario registrado con éxito.' + user);
    res.redirect('/api/sessions/login');
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).render("login", { error: "Valores erroneos" });

    const user = await usuario.findOne({ email }, { first_name: 1, last_name: 1, age: 1, password: 1, email: 1});

    if (!user) {
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
            req.session.user = {
                email: email,
                role: "admin"
            }
            res.redirect("/profile");
        }else{
            return res.status(400).render("login", { error: "Usuario no encontrado" });
        }
    }else{
        if(user.email !== email || user.password !== password ){
            return res.send("Los datos ingresados son incorrectos")
        }
        
        if(email !== "adminCoder@coder.com" || password !== "adminCod3r123" ){
            req.session.user = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                role: "user"
            };
        
            //console.log(req.session)
            res.redirect("/profile"); 
        }
    }
});



module.exports = router