import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonList from "./components/Person";
import api from "./services/personService";

const App = () => {
  useEffect(() => {
    api
      .getAll()
      .then((res) => {
        setPersons(res?.data);
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
        setNotification({
          message: `Failed to fetch data: ${err?.response?.data?.message}`,
          type: "error",
        });
      });
  }, []);

  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState();

  const filteredPersons = persons.filter((p) =>
    p?.name?.toLowerCase().includes(filter?.toLowerCase())
  );

  const errorHandler = (prefix, err) => {
    const message = err?.response?.data?.message || err;
    console.log(message);
    setNotification({
      message: `${prefix}: ${message}`,
      type: "error",
    });
  };

  const addPersonHandler = (e) => {
    e.preventDefault();

    if (newName === "" || newNumber === "") {
      setNotification({
        message: "Please insert name and number",
        type: "error",
      });
      return;
    }

    api
      .create({
        name: newName,
        number: newNumber,
      })
      .then((res) => {
        const addPerson = [...persons, res?.data];
        setPersons(addPerson);
        setNotification({
          message: `Added ${newName}`,
          type: "success",
        });
      })
      .catch((err) => {
        errorHandler("Failed to create new contact", err);
      })
      .finally(() => {
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const deletePersonHandler = (e) => {
    const id = e.target.id;
    const name = persons.find((p) => p.id === id)?.name;
    if (!window.confirm(`Are you sure want to delete ${name}?`)) return;

    api
      .remove(id)
      .then(() => {
        setNotification({
          message: `${name} successfully deleted`,
          type: "success",
        });
      })
      .catch((err) => {
        errorHandler("Failed to delete contact", err);
      })
      .finally(() => {
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });

    const deletePerson = persons.filter((p) => p.id !== id);
    setPersons(deletePerson);
  };

  const newNameHandler = (e) => setNewName(e.target.value);
  const newNumberHandler = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification notification={notification} />}
      <Filter filter={filter} setFilter={setFilter} />
      <Form
        addPersonHandler={addPersonHandler}
        newNameHandler={newNameHandler}
        newNumberHandler={newNumberHandler}
      />
      <PersonList
        persons={filteredPersons}
        deletePersonHandler={deletePersonHandler}
      />
    </div>
  );
};

export default App;
