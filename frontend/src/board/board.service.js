const axios = require('axios');

class BoardService {
  constructor() {}

  async createPost(postBody, userNickname) {
    try {
      const {data} = await axios.post(`http://localhost:4000/create`, {
        postBody,
        userNickname,
      });
      return data;
    } catch (e) {
      console.error('Error in createPost:', e);
      throw e;
    }
  }

  async findAllPost() {
    try {
      const {data} = await axios.get(`http://localhost:4000/`);
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
      const {data} = await axios.get(`http://localhost:4000/${postUid}`);
      return data;
    } catch (e) {
      console.error('Error in findOnePost:', e);
      throw e;
    }
  }

  async deletePost(postUid) {
    try {
      await axios.delete(`http://localhost:4000/${postUid}`);
      return {message: 'deleted success'};
    } catch (e) {
      console.error('Error in deletePost:', e);
      throw e;
    }
  }

  async incrementViews(postUid) {
    try {
      const view = await axios.put(`http://localhost:4000/${postUid}`);
      console.log(view);
    } catch (e) {
      console.error('Error in incrementViews:', e);
      throw e;
    }
  }

  async likePost(postUid) {
    try {
      await axios.patch(`http://localhost:4000/${postUid}/like`);
    } catch (e) {
      console.error('Error in likePost:', e);
      throw e;
    }
  }
}

module.exports = BoardService;
