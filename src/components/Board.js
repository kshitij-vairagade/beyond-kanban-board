import React, { useState, useEffect } from "react";
import Column from "./Column";
import TaskModal from "./TaskModal";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board = () => {
  const [columns, setColumns] = useState(() => {
    return JSON.parse(localStorage.getItem("kanbanColumns")) || {
      todo: { title: "To Do", tasks: [] },
      inProgress: { title: "In Progress", tasks: [] },
      completed: { title: "Completed", tasks: [] },
    };
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const addOrUpdateTask = (task) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      if (task.id) {
        // Update existing task
        Object.keys(newColumns).forEach((col) => {
          newColumns[col].tasks = newColumns[col].tasks.map((t) => (t.id === task.id ? task : t));
        });
      } else {
        // Add new task
        task.id = uuidv4();
        newColumns["todo"].tasks.push(task);
      }
      return newColumns;
    });
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const deleteTask = (taskId) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      Object.keys(newColumns).forEach((col) => {
        newColumns[col].tasks = newColumns[col].tasks.filter((t) => t.id !== taskId);
      });
      return newColumns;
    });
  };

  const moveTask = (taskId, toColumn) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      let taskToMove = null;

      // Remove task from previous column
      Object.keys(newColumns).forEach((col) => {
        newColumns[col].tasks = newColumns[col].tasks.filter((task) => {
          if (task.id === taskId) {
            taskToMove = task;
            return false;
          }
          return true;
        });
      });

      // Add task to new column
      if (taskToMove) {
        newColumns[toColumn].tasks.push(taskToMove);
      }

      return newColumns;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
            <Column key={key} id={key} title={column.title} tasks={column.tasks} moveTask={moveTask} setSelectedTask={setSelectedTask} />
          ))}
        </div>

        {/* Task Modal */}
        {isModalOpen && (
          <TaskModal
            task={selectedTask}
            setTask={setSelectedTask}
            onSave={addOrUpdateTask}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedTask(null);
            }}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default Board;
