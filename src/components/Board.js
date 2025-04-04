import React, { useState, useEffect } from "react";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { v4 as uuidv4 } from "uuid";

const Board = () => {
  const [columns, setColumns] = useState(() => {
    return JSON.parse(localStorage.getItem("kanbanColumns")) || {
      todo: { title: "To do", tasks: [] },
      inProgress: { title: "In Progress", tasks: [] },
      completed: { title: "Completed", tasks: [] },
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", column: "todo" });

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task = { id: uuidv4(), title: newTask.title, description: newTask.description };
    setColumns((prev) => {
      const newColumns = { ...prev };
      newColumns[newTask.column].tasks.push(task);
      return newColumns;
    });
    setIsModalOpen(false);
    setNewTask({ title: "", description: "", column: "todo" });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">BEYOND</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 text-white px-4 py-2 rounded">
          + Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-auto">
        {Object.entries(columns).map(([key, column]) => (
          <Column key={key} id={key} title={column.title} tasks={column.tasks} />
        ))}
      </div>

      {/* Task Modal */}
      {isModalOpen && <TaskModal newTask={newTask} setNewTask={setNewTask} addTask={addTask} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Board;
