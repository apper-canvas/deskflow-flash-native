import { useState, useEffect } from "react";
import { taskService } from "@/services/api/taskService";
import { toast } from "react-toastify";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      const errorMessage = err.message || "Failed to load tasks";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      setActionLoading(true);
      setError(null);
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success("Task added successfully!");
    } catch (err) {
      const errorMessage = err.message || "Failed to add task";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const toggleTaskComplete = async (taskId) => {
    try {
      setActionLoading(true);
      setError(null);
      const updatedTask = await taskService.toggleComplete(taskId);
      setTasks(prev => 
        prev.map(task => 
          task.Id === taskId ? updatedTask : task
        )
      );
      toast.success(
        updatedTask.completed 
          ? "Task completed! 🎉" 
          : "Task marked as active"
      );
    } catch (err) {
      const errorMessage = err.message || "Failed to update task";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setActionLoading(true);
      setError(null);
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully");
    } catch (err) {
      const errorMessage = err.message || "Failed to delete task";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const retryLoad = () => {
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    actionLoading,
    addTask,
    toggleTaskComplete,
    deleteTask,
    retryLoad
  };
};