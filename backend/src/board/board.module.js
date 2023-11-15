const BoardService = require("./board.service");
const BoardController = require("./board.controller");

const db = require("../lib/db");
const { Posts } = db;
const boardService = new BoardService(Posts);
const boardController = new BoardController(boardService);

module.exports = {
  boardController,
};
