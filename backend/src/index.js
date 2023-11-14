const express = require('express');
const router = express.Router();
const userRouter = require('./user/user.router');
const boardRouter = require('./board/board.router');
const emailRouter = require('./email/email.router');
const adminRouter = require('./admin/admin.router');
const chatRouter = require('./chat/chat.route');

// 참고 용도
/**
 * @swagger
 *  /:
 *    get:
 *      tags:
 *      - BACK Main
 *      description: 메인
 *      parameters:
 *        - in: query
 *          name: id
 *          required: true
 *          schema:
 *            type: integer
 *            description: id
 *      responses:
 *       200:
 *        description: 성공
 *       400:
 *        description: 실패
 */
router.use('/', boardRouter);
router.use('/users', userRouter);
router.use('/email', emailRouter);
router.use('/admin', adminRouter);
router.use('/chat', chatRouter);

module.exports = router;
