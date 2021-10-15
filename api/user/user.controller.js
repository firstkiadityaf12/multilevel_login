const models = require("../../models/index");
const user = models.user;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    controllerAdd: (req, res) => {
        const data = {
            username: req.body.username,
            email: req.body.email,
            password: md5(req.body.password),
            role: req.body.role
        }
        user.create(data)
        .then(result => {
            res.json({
                message: "Data berhasil ditambahkan",
                success: 1,
                data: result,data
            })
        })
    }
}


