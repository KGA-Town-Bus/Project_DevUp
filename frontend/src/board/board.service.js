const axios = require('axios');
require('dotenv').config();
const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP;
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT;

class BoardService {
  constructor() {}

  async createPost(body) {
    try {
      const {data} = await axios.post(
        `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts`,
        body,
      );

      return data;
    } catch (e) {
      console.error('Error in createPost:', e);
      throw new Error(e.message);
    }
  }

  async findAllPost() {
    try {
      const {data} = await axios.get(
        `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts`,
      );
      return data;
    } catch (e) {
      console.error('Error in findAllPost:', e);
      throw new Error(e.message);
    }
  }

  async findOnePost(postUid) {
    try {
      const {data} = await axios.get(
        `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts`,
        postUid,
      );
      return data;
    } catch (e) {
      console.error('Error in findOnePost:', e);
      throw new Error(e.message);
    }
  }
}

module.exports = BoardService;
