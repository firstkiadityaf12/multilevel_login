const models = require("../../models/index");
const user = models.user;
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../auth/secret.json');

module.exports = {
    // controller GET All
    controllerGetAll:(req,res)=>{
        user.findAll()
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    // controller GET by ID
    controllerGetId:(req,res)=>{
        const param = { id: req.params.id}
        user.findOne({where:param})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    // controller ADD
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
    },
    // controller EDIT
    controllerEdit:(req,res)=>{
        const param = { id: req.body.id}
        const data = {
            id: req.body.id,
            username : req.body.username,
            email : req.body.email,
            password : md5(req.body.password),
            role : req.body.role
        }
        user.update(data , {where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result,data
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    // controller DELETE
    controllerDelete: (req,res)=>{
        const param = { id: req.body.id}
        user.destroy({where: param})
        .then(result => {
            res.json({
                success : 1,
                data : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
    },
    //controller AUTH
    controllerAuth: async (req,res)=>{
        const data = {
            email : req.body.email,
            password : md5(req.body.password)
        }
        let result = await user.findOne({where: data})
        if(result){
            // generate token
            let token = jwt.sign({ sub: result.id, role: result.role }, config.secret)
            res.json({
                logged: true,
                data: result,
                token: token
            })
        }else{
            res.json({
                logged: false,
                message: "Username or password is incorrect",
                data: result
            })
        }   
    }
}


