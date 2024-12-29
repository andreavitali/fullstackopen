import axios from "axios";
const baseUrl = "/api/blogs";

let config = null;

const setToken = newToken => {
  const token = `Bearer ${newToken}`;
  config = { headers: { Authorization: token } };
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async blog => {
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const remove = async blogId => {
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

export default { setToken, getAll, create, update, remove };
