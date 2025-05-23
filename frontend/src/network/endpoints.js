// const baseUrl = "http://localhost:8080";
// Prod base url
const baseUrl = "https://blogapp-3ul0.onrender.com";

const Endpoints = {
  login: `${baseUrl}/auth/login`,
  signup: `${baseUrl}/auth/signup`,
  posts: `${baseUrl}/blog/all`,
  allGenres: `${baseUrl}/genres/all`,
  createPost: `${baseUrl}/blog/create`,
  comments: `${baseUrl}/comment/all`,
  createComment: `${baseUrl}/comment/add`,
};

export default Endpoints;
