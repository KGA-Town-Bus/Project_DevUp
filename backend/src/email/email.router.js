const express = require('express');
const emailRouter = express.Router();
const {emailController} = require('./email.module');
const getMailLink = emailController.getMailLink.bind(emailController);


emailRouter.get("/:code", getMailLink)


module.exports = emailRouter