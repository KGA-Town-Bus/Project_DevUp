const express = require('express');
const adminRouter = express.Router();

const {adminController} = require('./admin.module');
const getAdmin = adminController.getAdmin.bind(adminController);
const patchAdmin = adminController.patchAdmin.bind(adminController)

adminRouter.get('/users', getAdmin);
adminRouter.patch("/users", patchAdmin)

module.exports = adminRouter;
