import React from "react";

const TaskModal = ({ newTask, setNewTask, addTask, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">New Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <select
          value={newTask.column}
          onChange={(e) => setNewTask({ ...newTask, column: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-400 text-white p-2 rounded">
            Cancel
          </button>
          <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
