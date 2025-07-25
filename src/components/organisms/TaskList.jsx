import React from "react";
import { AnimatePresence } from "framer-motion";
import TaskItem from "@/components/organisms/TaskItem";
import Empty from "@/components/ui/Empty";

const TaskList = ({ 
  tasks = [], 
  onToggleComplete, 
  onDeleteTask, 
  loading = false,
  filter = "all"
}) => {
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  if (filteredTasks.length === 0) {
    const emptyMessages = {
      all: {
        title: "No tasks yet",
        description: "Add your first task to get started with DeskFlow"
      },
      active: {
        title: "All caught up!",
        description: "You've completed all your active tasks. Great job!"
      },
      completed: {
        title: "No completed tasks",
        description: "Complete some tasks to see them here"
      }
    };

    const message = emptyMessages[filter] || emptyMessages.all;
    
    return (
      <Empty
        title={message.title}
        description={message.description}
        actionText={filter === "all" ? "Add Your First Task" : null}
        onAction={filter === "all" ? () => document.querySelector('input')?.focus() : null}
      />
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.Id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
            loading={loading}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;