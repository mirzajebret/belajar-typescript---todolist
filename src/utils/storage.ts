// src/utils/storage.ts

export const saveTasksToStorage = (tasks: any[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  
  export const loadTasksFromStorage = (): any[] => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  };
  