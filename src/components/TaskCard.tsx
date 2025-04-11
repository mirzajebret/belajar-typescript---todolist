import React from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  return (
    <div
      className={`p-3 mb-3 rounded shadow flex justify-between items-center cursor-pointer ${
        task.done ? "bg-green-100 line-through" : "bg-white"
      } dark:bg-gray-700 dark:text-white`}
    >
      <span onClick={() => onToggle(task.id)} className="flex-1">
        {task.text}
      </span>
      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
    📂{task.category}
    </p>
      <button
        onClick={() => onDelete(task.id)}
        className="ml-3 text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  );
}
