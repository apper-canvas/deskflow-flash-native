import tasksData from "@/services/mockData/tasks.json";

// Simulate localStorage for persistence
const STORAGE_KEY = "deskflow_tasks";

// Initialize localStorage with mock data if empty
const initializeStorage = () => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksData));
  }
};

// Get data from localStorage
const getStorageData = () => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save data to localStorage
const saveStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Simulate network delay
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

export const taskService = {
  // Get all tasks
  getAll: async () => {
    await delay(200);
    const tasks = getStorageData();
    return [...tasks];
  },

  // Get task by ID
  getById: async (id) => {
    await delay(200);
    const tasks = getStorageData();
    const task = tasks.find(t => t.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  // Create new task
  create: async (taskData) => {
    await delay(300);
    const tasks = getStorageData();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    
    const newTask = {
      Id: maxId + 1,
      text: taskData.text,
      completed: false,
      priority: taskData.priority || "medium",
      createdAt: new Date().toISOString(),
      ...taskData
    };
    
    const updatedTasks = [...tasks, newTask];
    saveStorageData(updatedTasks);
    return { ...newTask };
  },

  // Update task
  update: async (id, updateData) => {
    await delay(250);
    const tasks = getStorageData();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    const updatedTask = { ...tasks[index], ...updateData };
    tasks[index] = updatedTask;
    saveStorageData(tasks);
    return { ...updatedTask };
  },

  // Delete task
  delete: async (id) => {
    await delay(250);
    const tasks = getStorageData();
    const filteredTasks = tasks.filter(t => t.Id !== parseInt(id));
    saveStorageData(filteredTasks);
    return true;
  },

  // Toggle task completion
  toggleComplete: async (id) => {
    await delay(200);
    const tasks = getStorageData();
    const index = tasks.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) {
      throw new Error("Task not found");
    }
    
    tasks[index].completed = !tasks[index].completed;
    saveStorageData(tasks);
    return { ...tasks[index] };
  }
};