import React, { useState } from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const TaskInput = ({ onAddTask, loading = false }) => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() && !loading) {
      onAddTask({
        text: taskText.trim(),
        priority: priority
      });
      setTaskText("");
      setPriority("medium");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              disabled={loading}
              className="text-base"
              autoFocus
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={loading}
              className="min-w-[120px]"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium</option>
              <option value="high">High Priority</option>
            </Select>
            
            <Button
              type="submit"
              disabled={!taskText.trim() || loading}
              className="px-6"
            >
              {loading ? (
                <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                  Add Task
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;