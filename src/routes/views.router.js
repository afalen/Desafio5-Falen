const express = require('express')

const router = express.Router()


router.get("/profile", (req, res) => {
    if (!req.session.email) {
        return res.redirect("/api/sessions/login")
    }

    const { first_name, last_name, email, age } = req.session
    res.render("profile", { first_name, last_name, email, age })
})

module.exports = router