import { useState, useEffect } from "react";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import Filter from "./Filter";
import personsService from "./services/personsService";
import NotificationMessage from "./components/Notification";
import { ResponseStatus } from "./constants/constants";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((data) => {
      console.log(`promise fulfilled, data: ${data}`);
      setPersons(data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const addOrUpdatePerson = (event) => {
    event.preventDefault();

    const nameToAdd = newName.trim();

    const person = persons.find(
      (p) => p.name.trim().toLowerCase() === nameToAdd.toLowerCase()
    );

    if (person) {
      let confirmed = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmed) {
        setPersons(
          persons.map((p) =>
            person.id === p.id
              ? { number: newNumber, name: newName, id: p.id }
              : p
          )
        );
        personsService
          .update(person.id, {
            name: newName,
            number: newNumber,
          })
          .then((response) => {
            setNotification({
              message: `Updated ${newName}'s number`,
              responseStatus: ResponseStatus.SUCCESS,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            console.log(response);
          })
          .catch(() => {
            // Revert the optimistic update
            setPersons(persons.filter((p) => p.id !== person.id));
            setNotification({
              message: `Note '${newName}' was already removed from server`,
              responseStatus: ResponseStatus.FAILURE,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          });
      }
    } else {
      personsService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((response) => {
          setPersons(persons.concat({ name: newName, number: newNumber }));
          setNotification({
            message: `Added ${newName}`,
            responseStatus: ResponseStatus.SUCCESS,
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setNotification({
            message: `${error.response.data.error}`,
            responseStatus: ResponseStatus.FAILURE,
          });
        });
    }
  };

  const deletePerson = (personToDelete) => {
    let userConfirmed = window.confirm(`Delete ${personToDelete.name}`);
    if (userConfirmed) {
      personsService.deletePerson(personToDelete.id).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== personToDelete.id));
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationMessage
        message={notification?.message}
        responseStatus={notification?.responseStatus}
      />
      <Filter
        handleFilterChange={handleFilterChange}
        filter={newFilter}
      ></Filter>
      <h1>Add a new</h1>
      <PersonForm
        addOrUpdatePerson={addOrUpdatePerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        name={newName}
        number={newNumber}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={newFilter}
        deletePerson={deletePerson}
      ></Persons>
    </div>
  );
};

export default App;
