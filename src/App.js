import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {

  const baseUrl = 'https://secret-dusk-60490.herokuapp.com/api'

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const getTasks = async () =>{
      const getTaskFromServer = await fetchTasks()
      setTask(getTaskFromServer.data)
    } 
    getTasks();
  },[]);

  // fetch tasks
  const fetchTasks = async () => {
    const res = await fetch(
      `${baseUrl}/tasks`
    );
    const data = await res.json();

    return data
  };

  // Add task
  const addTask = async (task) => {
    const res = await fetch(`${baseUrl}/tasks`,{
      method:'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body:JSON.stringify(task)
    })

    const data = await res.json()
    // console.log(data.data.reminder);
    setTask([...tasks, data.data]);
  };

  // Delete task
  const deleteTask = async (id) => {
    setTask(tasks.filter((task) => task.id !== id));
    await fetch(`${baseUrl}/tasks/${id}`,{
      method: 'DELETE'
    })
   
  };

  // Toggle reminder
  const toggleReminder = (id) => {
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No data found"
      )}
    </div>
  );
}

export default App;
