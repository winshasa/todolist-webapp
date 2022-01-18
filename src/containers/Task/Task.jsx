import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://127.0.0.1:8003/";

const Task = () => {
  const initialValue = {
    title: "",
    completed: 0,
    description: "",
  };
  const [task, setTask] = useState(initialValue);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleTaskChange = (e) => {
    setError("");
    let task = {
      title: e.target.value,
      completed: 0,
    };
    setTask(task);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: URL + "api/tasks",
    })
      .then((response) => {
        setTasks(response.data.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);

  const handleAddTask = async () => {
    if (task.title !== "") {
      //Ajouter un tache dans la base de donnes
      await axios({
        method: "post",
        url: URL + "api/tasks",
        data: task,
      })
        .then((response) => {
          let arrTask = [...tasks, response.data.data];
          setTasks(arrTask);
          setTask(initialValue);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } else {
      setError("Can't input empty task value");
    }
  };

  const handleDone = async (event, taskId) => {
    event.preventDefault();
    let task_copy = [...tasks];
    let updated = task_copy.filter((t) => t.id === taskId)[0];
    updated.completed = !updated.completed;
    console.log("updated: ", updated);

    await axios({
      method: "patch",
      url: URL + "api/tasks/" + taskId,
      data: {
        ...updated,
        description: "",
      },
    })
      .then((response) => {
        let task_copy = [...tasks];
        task_copy.map((t) => {
          if (t.id === taskId) {
            t = response.data.data;
          }
          return t;
        });
        setTasks(task_copy);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleRemove = async (taskId) => {
    await axios({
      method: "delete",
      url: URL + "api/tasks/" + taskId,
    })
      .then((response) => {
        let task_copy = [...tasks];
        let updated = task_copy.filter((t) => t.id === taskId)[0];
        let index = task_copy.indexOf(updated);
        task_copy.splice(index, 1);
        setTasks(task_copy);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-gray-900">Todo List</h1>
          {error !== "" ? <b className="text-red-600">{error}</b> : ""}
          <div className="flex mt-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-900"
              placeholder="Add Todo"
              onChange={handleTaskChange}
              value={task && task.title}
            />
            <button
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
              onClick={handleAddTask}>
              Ajouter
            </button>
          </div>
        </div>
        <div>
          {tasks.map((task) => {
            return (
              <div key={task.id} className="flex mb-4 items-center">
                <p
                  className={
                    "w-7/12 text-gray-darkest " +
                    (task.completed ? "line-through text-green" : "")
                  }>
                  {task.title}
                </p>
                <div className="flex justify-end w-5/12">
                  <button
                    className={
                      "flex-no-shrink p-2 mr-2 border-2 rounded hover:text-white " +
                      (task.completed
                        ? "text-gray hover:bg-gray border-gray"
                        : "text-green border-green hover:bg-green")
                    }
                    onClick={(event) => handleDone(event, task.id)}>
                    {task.completed ? "Not Done" : "Done"}
                  </button>
                  <button
                    className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red"
                    onClick={() => handleRemove(task.id)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Task;
