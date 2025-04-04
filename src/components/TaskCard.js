import React from "react";
import { useDrag } from "react-dnd";
import { motion } from "framer-motion";

const TaskCard = ({ task, setSelectedTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`bg-gray-50 p-4 rounded-lg shadow border border-gray-200 ${isDragging ? "opacity-50" : ""}`}
      onClick={() => setSelectedTask(task)}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-gray-500">{task.description}</p>
    </motion.div>
  );
};

export default TaskCard;
