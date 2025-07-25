import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TaskManager from "@/components/pages/TaskManager";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="*" element={<TaskManager />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;