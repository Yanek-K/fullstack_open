import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const update = (person, updatedContact) => {
  const request = axios.put(`${baseUrl}/${person.id}`, updatedContact);
  return request.then((response) => response.data);
};

const deletePerson = (person) => {
  const request = axios.delete(`${baseUrl}/${person.id}`);
  return request.then((response) => response.data);
};

const personService = { getAll, create, update, deletePerson };
export default personService;
