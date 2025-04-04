import React, { useState } from "react";

const TaskModal = ({ task = {}, setTask, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{task.id ? "Edit Task" : "New Task"}</h2>
        <input className="w-full p-2 border rounded mb-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="w-full p-2 border rounded mb-2" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className="flex justify-between">
          {task.id && <button className="bg-red-500 text-white p-2 rounded" onClick={() => onSave(null)}>Delete</button>}
          <button className="bg-blue-500 text-white p-2 rounded" onClick={() => onSave({ ...task, title, description })}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
