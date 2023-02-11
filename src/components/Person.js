const Person = ({ person, deletePersonHandler }) => {
  return (
    <div>
      {person.name} : {person.number}
      <button id={person.id} onClick={deletePersonHandler}>
        delete
      </button>
    </div>
  );
};

const PersonList = ({ persons, deletePersonHandler }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <div>
        {persons.length > 0 ? (
          persons.map((person) => {
            return (
              <Person
                key={person.id}
                person={person}
                deletePersonHandler={deletePersonHandler}
              />
            );
          })
        ) : (
          <p>No contact found</p>
        )}
      </div>
    </div>
  );
};

export default PersonList;
