import React from "react";
import TaskCard from "./TaskCard";

const Column = ({ id, title, tasks }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 w-72 min-h-[300px]">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
