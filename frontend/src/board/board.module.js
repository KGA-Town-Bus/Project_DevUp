const BoardService = require('./board.service');
const BoardController = require('./board.controller');

const boardService = new BoardService();
const boardController = new BoardController(boardService);

module.exports = {
  boardController,
};
