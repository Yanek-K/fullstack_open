import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteContact = (person) => {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request.then((response) => response.data);
};

const updateContact = (person, updatedContact) => {
  const request = axios.put(`${baseUrl}/${person.id}`, updatedContact);
  return request.then((response) => response.data);
};

export default { getAll, createContact, deleteContact, updateContact };
