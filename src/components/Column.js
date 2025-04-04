import React from "react";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

const Column = ({ id, title, tasks, moveTask, setSelectedTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, id),
  });

  return (
    <div ref={drop} className="bg-white rounded-lg shadow p-4 w-72 min-h-[300px]">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} setSelectedTask={setSelectedTask} />
        ))}
      </div>
    </div>
  );
};

export default Column;
