import React, { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard.tsx";
import { saveTasksToStorage, loadTasksFromStorage } from "./utils/storage.ts";

interface Task {
  id: number;
  text: string;
  done: boolean;
  category: string;
}


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [category, setCategory] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);


  // Load saat pertama kali
  useEffect(() => {
    const saved = loadTasksFromStorage();
    setTasks(saved);
    setIsLoaded(true); 
  }, []);
  

  // Simpan setiap ada perubahan
  useEffect(() => {
    if (isLoaded) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoaded]);
  
  function addTask() {
    if (!input.trim()) return;
    const newTask: Task = {
        id: Date.now(),
        text: input,
        done: false,
        category: category || "Umum",
    };
    setTasks([newTask, ...tasks]);
    setInput("");
    setCategory("");
  }

  function toggleTask(id: number) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }
  
  function downloadTasks() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <div className="flex flex-col items-center p-6">
          <div className="flex justify-between items-center w-full max-w-md mb-4">
            <h1 className="text-2xl font-bold">📋 Todo App</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-700 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          <div className="mb-6 flex gap-2 w-full max-w-md">
            <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                className="border rounded px-3 py-2 w-3/4 dark:bg-gray-800 dark:text-white"
                placeholder="add a new task..."
            />
            <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="border rounded px-3 py-2 w-1/4 dark:bg-gray-800 dark:text-white text-xs"
            >
              <option value=""></option>
              <option value="Umum">Umum</option>
              <option value="Pekerjaan">Pekerjaan</option>
              <option value="Pribadi">Pribadi</option>
              <option value="Lainnya">Lainnya</option>
            </select>
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
            <div>
              <h2 className="text-lg font-semibold mb-2">📌</h2>
              {tasks.filter(t => !t.done).map(task => (
                <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">✅</h2>
              {tasks.filter(t => t.done).map(task => (
                <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
              ))}
              
            </div>
            <div className="text-center mt-6">
            <button
                onClick={downloadTasks}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Download JSON
            </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
