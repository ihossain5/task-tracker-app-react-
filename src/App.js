import { useState } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import  Tasks  from "./components/Tasks";


function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTask]= useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:00pm",
      reminder: true,
    },
    {
      id: 2,
      text: "patient Appointment",
      day: "Feb 6th at 4:00pm",
      reminder: true,
    },
    {
      id: 3,
      text: " Appointment",
      day: "Feb 8th at 6:00pm",
      reminder: false,
    },
  ])

 // Add task 
  const addTask =(task) =>{
    const id = Math.floor(Math.random() * 10000)+1
    const newTask = {id, ...task}
    // console.log(newTask);
    setTask([...tasks, newTask])
  }

 // Delete task 
  const deleteTask =(id) =>{
    setTask(tasks.filter((task)=> task.id !== id))
  }

 // Toggle reminder 
  const toggleReminder =(id) =>{
    setTask(tasks.map((task)=> task.id === id ? {...task,reminder : !task.reminder}: task))
  }


  return (
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask} />
     {showAddTask && <AddTask onAdd={addTask}/>}
     {tasks.length > 0 ?<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No data found'}
    </div>
  );
}

export default App;
