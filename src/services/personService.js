import axios from "axios";
const baseUrl =
  "https://fullstackopen-part3.miftahulrespati.repl.co/api/persons";

const getAll = async () => {
  return await axios.get(baseUrl);
};

const create = async (person) => {
  return await axios.post(baseUrl, person);
};

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

const personService = { getAll, create, remove };

export default personService;
