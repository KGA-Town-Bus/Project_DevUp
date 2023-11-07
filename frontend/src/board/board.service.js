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
        `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}`,
        postUid,
      );
      return data;
    } catch (e) {
      console.error('Error in findOnePost:', e);
      throw new Error(e.message);
    }
  }

  async updatePost(postUid, updateData) {
    try {
      const response = await axios.put(
        `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}`,
        updateData,
      );
      return response.data;
    } catch (e) {
      console.error('Error in updatePost:', e);
      throw e;
    }
  }

  async deletePost(postUid) {
    try {
      await axios.delete(
        `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}`,
      );
      return {message: 'Post deleted successfully.'};
    } catch (e) {
      console.error('Error in deletePost:', e);
      throw e;
    }
  }

  async incrementViews(postUid) {
    try {
      await axios.patch(
        `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}/views`,
      );
      return {message: 'Views incremented.'};
    } catch (e) {
      console.error('Error in incrementViews:', e);
      throw e;
    }
  }

  async likePost(postUid) {
    try {
      await axios.patch(
        `http://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/posts/${postUid}/like`,
      );
      return {message: 'Post liked.'};
    } catch (e) {
      console.error('Error in likePost:', e);
      throw e;
    }
  }
}

module.exports = BoardService;
