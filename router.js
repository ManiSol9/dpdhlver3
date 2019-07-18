var router = require('express').Router();
var express=require('express');

router.use('/',express.static(__dirname + '/public'));

exports=module.exports=router;