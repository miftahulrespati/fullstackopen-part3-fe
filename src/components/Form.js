const Form = ({ addPersonHandler, newNameHandler, newNumberHandler }) => {
  return (
    <div>
      <h3>add a new</h3>
      <form onSubmit={addPersonHandler}>
        <div>
          name:
          <input type="text" onChange={newNameHandler} />
        </div>
        <div>
          number:
          <input type="text" onChange={newNumberHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
