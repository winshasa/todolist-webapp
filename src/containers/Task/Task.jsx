import React, { useState } from "react";

const Task = () => {
  const [task, setTask] = useState({
    title: "",
    completed: 0,
    // description: ''
  });
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleTaskChange = (e) => {
    let task = {
      title: e.target.value,
      completed: 0,
    };
    setTask(task);
  };

  const handleAddTask = () => {
    if (task.title !== "") {
      let arrTask = [...tasks, task];
      setTasks(arrTask);
    } else {
      setError("Can't input empty task value");
    }
  };

  const handleDone = (event, index) => {
    event.preventDefault();
    let task_copy = [...tasks];
    let completed = task_copy[index].completed;
    task_copy[index].completed = !completed ? 1 : 0;
    setTasks(task_copy);
  };

  const handleRemove = (index) => {
    let task_copy = [...tasks];
    task_copy.splice(index, 1);
    setTasks(task_copy);
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          {error !== "" ? <b className="text-red-600">{error}</b> : ""}
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              onChange={handleTaskChange}
            />
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              onClick={handleAddTask}>
              Ajouter
            </button>
          </div>
        </div>
        <div>
          {tasks.map((task, index) => {
            return (
              <div key={index} className="flex mb-4 items-center">
                <p
                  className={
                    "w-full text-grey-darkest " +
                    (task.completed === 1 ? "line-through" : "")
                  }>
                  {task.title}
                </p>
                <button
                  className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green"
                  onClick={(event) => handleDone(event, index)}>
                  {task.completed === 1 ? "Pas finis" : "Finis"}
                </button>

                <button
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                  onClick={() => handleRemove(index)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Task;
