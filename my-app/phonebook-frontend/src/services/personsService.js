import axios from "axios";

const baseUrl = "https://api-j7rx7hkrga-uc.a.run.app";

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/persons`);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/api/persons`, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/api/persons/${id}`, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/api/persons/${id}`);
  return request;
};

export default { getAll, create, update, deletePerson };
