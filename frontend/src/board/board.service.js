const axios = require('axios');

class BoardService {
  constructor() {}

  async createPost(postBody, userNickname, req) {
    try {
      const {authorization} = req.cookies;
      const {data} = await axios.post(
        `http://localhost:4000/create`,
        {
          postBody,
          userNickname,
        },
        {
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
          withCredentials: true,
        },
      );

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
      console.error('Error in findAllPost:', e);
      throw e;
    }
  }

  async findOnePost(postUid, req) {
    try {
      const {authorization} = req.cookies;
      const {data} = await axios.get(`http://localhost:4000/${postUid}`, {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
        withCredentials: true,
      });
      return {...data};
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
