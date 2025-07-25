import { toast } from 'react-toastify';

export const taskService = {
  // Get all tasks
  getAll: async () => {
    try {
      const tableName = 'task_c';
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "Owner"
            }
          },
          {
            field: {
              Name: "CreatedOn"
            }
          },
          {
            field: {
              Name: "CreatedBy"
            }
          },
          {
            field: {
              Name: "ModifiedOn"
            }
          },
          {
            field: {
              Name: "ModifiedBy"
            }
          },
          {
            field: {
              Name: "text_c"
            }
          },
          {
            field: {
              Name: "completed_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "created_at_c"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "Id",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 50,
          offset: 0
        }
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Map database fields to UI expected format
      const mappedData = (response.data || []).map(task => ({
        Id: task.Id,
        text: task.Name || task.text_c || '',
        completed: task.completed_c || false,
        priority: task.priority_c || 'medium',
        createdAt: task.created_at_c || task.CreatedOn || new Date().toISOString(),
        // Keep original database fields for updates
        Name: task.Name,
        Tags: task.Tags,
        Owner: task.Owner,
        text_c: task.text_c,
        completed_c: task.completed_c,
        priority_c: task.priority_c,
        created_at_c: task.created_at_c
      }));
      
      return mappedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error fetching tasks:", error.message);
        throw error;
      }
    }
  },

  // Get task by ID
  getById: async (id) => {
    try {
      const tableName = 'task_c';
      
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "Tags"
            }
          },
          {
            field: {
              Name: "Owner"
            }
          },
          {
            field: {
              Name: "text_c"
            }
          },
          {
            field: {
              Name: "completed_c"
            }
          },
          {
            field: {
              Name: "priority_c"
            }
          },
          {
            field: {
              Name: "created_at_c"
            }
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (!response.data) {
        return null;
      }
      
      // Map database fields to UI expected format
      const task = response.data;
      return {
        Id: task.Id,
        text: task.Name || task.text_c || '',
        completed: task.completed_c || false,
        priority: task.priority_c || 'medium',
        createdAt: task.created_at_c || new Date().toISOString(),
        // Keep original database fields
        Name: task.Name,
        Tags: task.Tags,
        Owner: task.Owner,
        text_c: task.text_c,
        completed_c: task.completed_c,
        priority_c: task.priority_c,
        created_at_c: task.created_at_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message);
        throw error;
      }
    }
  },

  // Create new task
  create: async (taskData) => {
    try {
      const tableName = 'task_c';
      
      // Only include Updateable fields
      const params = {
        records: [
          {
            Name: taskData.text || taskData.Name || '',
            text_c: taskData.text || '',
            completed_c: false,
            priority_c: taskData.priority || 'medium',
            created_at_c: new Date().toISOString()
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create tasks ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const newTask = successfulRecords[0].data;
          // Map to UI format
          return {
            Id: newTask.Id,
            text: newTask.Name || newTask.text_c || '',
            completed: newTask.completed_c || false,
            priority: newTask.priority_c || 'medium',
            createdAt: newTask.created_at_c || new Date().toISOString(),
            Name: newTask.Name,
            text_c: newTask.text_c,
            completed_c: newTask.completed_c,
            priority_c: newTask.priority_c,
            created_at_c: newTask.created_at_c
          };
        }
      }
      
      throw new Error("No successful records created");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error creating task:", error.message);
        throw error;
      }
    }
  },

  // Update task
  update: async (id, updateData) => {
    try {
      const tableName = 'task_c';
      
      // Only include Updateable fields plus Id
      const params = {
        records: [
          {
            Id: parseInt(id),
            ...(updateData.text !== undefined && { 
              Name: updateData.text,
              text_c: updateData.text 
            }),
            ...(updateData.completed !== undefined && { completed_c: updateData.completed }),
            ...(updateData.priority !== undefined && { priority_c: updateData.priority })
          }
        ]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update tasks ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const updatedTask = successfulUpdates[0].data;
          // Map to UI format
          return {
            Id: updatedTask.Id,
            text: updatedTask.Name || updatedTask.text_c || '',
            completed: updatedTask.completed_c || false,
            priority: updatedTask.priority_c || 'medium',
            createdAt: updatedTask.created_at_c || updatedTask.CreatedOn || new Date().toISOString(),
            Name: updatedTask.Name,
            text_c: updatedTask.text_c,
            completed_c: updatedTask.completed_c,
            priority_c: updatedTask.priority_c,
            created_at_c: updatedTask.created_at_c
          };
        }
      }
      
      throw new Error("No successful records updated");
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error updating task:", error.message);
        throw error;
      }
    }
  },

  // Delete task
  delete: async (id) => {
    try {
      const tableName = 'task_c';
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete tasks ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error deleting task:", error.message);
        throw error;
      }
    }
  },

  // Toggle task completion
  toggleComplete: async (id) => {
    try {
      // First get the current task to know its completion status
      const currentTask = await taskService.getById(id);
      if (!currentTask) {
        throw new Error("Task not found");
      }
      
      // Update with opposite completion status
      return await taskService.update(id, {
        completed: !currentTask.completed
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error toggling task completion:", error?.response?.data?.message);
        throw new Error(error.response.data.message);
      } else {
        console.error("Error toggling task completion:", error.message);
        throw error;
      }
    }
  }
};