const axios = require('axios');
require('dotenv').config();
const BACKEND_SERVER_IP = process.env.BACKEND_SERVER_IP;
const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT;
const PROTOCOL = process.env.PROTOCOL;

class BoardService {
  constructor() {}

  async createPost(body) {
    try {
      const {data} = await axios.post(
        `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/`,
        body,
      );

      return data;
    } catch (e) {
      console.error('Error in createPost:', e);
      throw e;
    }
  }

  async findAllPost() {
    try {
      const {data} = await axios.get(
        `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/`,
      );

      return data;
    } catch (error) {
      if (error.response) {
        // 서버가 보낸 응답을 로깅한다
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        // 서버 응답이 없는 다른 오류를 처리한다
        console.log('Error', error.message);
      }
    }
  }

  async findOnePost(postUid) {
    try {
      const {data} = await axios.get(
        `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/${postUid}`,
      );
      return data;
    } catch (e) {
      console.error('Error in findOnePost:', e);
      throw e;
    }
  }

  async updatePost(postUid, updateData) {
    try {
      const response = await axios.put(
        `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}//${postUid}`,
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
        `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/${postUid}`,
      );
      return {message: 'deleted success'};
    } catch (e) {
      console.error('Error in deletePost:', e);
      throw e;
    }
  }

  async incrementViews(postUid) {
    try {
      const view = await axios.put(
        `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/${postUid}`,
      );
      console.log(view);
    } catch (e) {
      console.error('Error in incrementViews:', e);
      throw e;
    }
  }

  async likePost(postUid) {
    try {
      await axios.patch(
        `${PROTOCOL}://${BACKEND_SERVER_IP}:${BACKEND_SERVER_PORT}/${postUid}/like`,
      );
    } catch (e) {
      console.error('Error in likePost:', e);
      throw e;
    }
  }
}

module.exports = BoardService;
