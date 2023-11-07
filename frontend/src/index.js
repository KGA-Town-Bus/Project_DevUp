const express = require('express');
const router = express.Router();
const userRouter = require('./user/user.router');
const boardRouter = require('./board/board.router');

// 참고 용도
/**
 * @swagger
 *  /:
 *    get:
 *      tags:
 *      - FRONT Main
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
router.get('/', (req, res, next) => {
  res.render('index.html');
});

router.use('/users', userRouter);
router.use('/posts', boardRouter);

module.exports = router;
