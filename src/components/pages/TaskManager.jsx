import React, { useState, useMemo } from "react";
import Header from "@/components/organisms/Header";
import TaskInput from "@/components/molecules/TaskInput";
import FilterTabs from "@/components/molecules/FilterTabs";
import TaskList from "@/components/organisms/TaskList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useTasks } from "@/hooks/useTasks";

const TaskManager = () => {
  const [filter, setFilter] = useState("all");
  const {
    tasks,
    loading,
    error,
    actionLoading,
    addTask,
    toggleTaskComplete,
    deleteTask,
    retryLoad
  } = useTasks();

  const taskCounts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    
    return { total, active, completed };
  }, [tasks]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header activeTaskCount={0} />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Loading />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header activeTaskCount={0} />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Error message={error} onRetry={retryLoad} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header activeTaskCount={taskCounts.active} />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Task Input */}
          <TaskInput onAddTask={addTask} loading={actionLoading} />
          
          {/* Filter Tabs */}
          <FilterTabs
            activeFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
          
          {/* Task List */}
          <TaskList
            tasks={tasks}
            filter={filter}
            onToggleComplete={toggleTaskComplete}
            onDeleteTask={deleteTask}
            loading={actionLoading}
          />
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center text-sm text-neutral-500">
            <p>
              DeskFlow - Simple task management for office professionals
            </p>
            <p className="mt-1">
              {taskCounts.total > 0 && (
                <>
                  {taskCounts.completed} of {taskCounts.total} tasks completed
                  {taskCounts.completed > 0 && taskCounts.total > 0 && (
                    <span className="ml-2 text-success-600 font-medium">
                      ({Math.round((taskCounts.completed / taskCounts.total) * 100)}%)
                    </span>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TaskManager;