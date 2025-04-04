import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200">
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-gray-500">{task.description}</p>
    </div>
  );
};

export default TaskCard;
