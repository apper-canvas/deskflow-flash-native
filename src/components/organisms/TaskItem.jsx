import React, { useState } from "react";
import { motion } from "framer-motion";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskItem = ({ 
  task, 
  onToggleComplete, 
  onDeleteTask, 
  loading = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleComplete = () => {
    if (!loading) {
      onToggleComplete(task.Id);
    }
  };

  const handleDelete = () => {
    if (!loading) {
      onDeleteTask(task.Id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "group bg-white rounded-lg p-4 shadow-sm border border-neutral-200",
        "task-item-hover",
        task.completed && "bg-neutral-50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4">
        {/* Checkbox */}
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          disabled={loading}
        />

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <p className={cn(
            "text-base font-medium text-neutral-900 transition-all duration-300 ease-out",
            task.completed ? "completed-task" : ""
          )}>
            {task.text}
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            Created {new Date(task.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>

        {/* Priority Badge */}
        <PriorityBadge priority={task.priority} />

        {/* Delete Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className="text-error-500 hover:text-error-600 hover:bg-error-50 p-2"
          >
            {loading ? (
              <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
            ) : (
              <ApperIcon name="Trash2" className="h-4 w-4" />
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaskItem;