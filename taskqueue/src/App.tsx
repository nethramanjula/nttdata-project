import React, { useState } from "react";
import "./App.css";
import TaskQueue from "./taskqueue/TaskQueue";

function App() {
  const [results, setResults] = useState<string[]>([]);
  const taskQueue = new TaskQueue();

  const task1 = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Task 1 completed");
        resolve();
      }, 1000);
    });

  const task2 = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Task 2 completed");
        resolve();
      }, 500);
    });

  const task3 = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Task 3 completed");
        resolve();
      }, 1500);
    });

  const handleTaskCompletion = (taskMessage: string) => {
    setResults((prevResults) => [...prevResults, taskMessage]);
  };

  const enqueueTasks = () => {
    taskQueue.enqueue(task1, () => handleTaskCompletion("Task 1 completed"));
    taskQueue.enqueue(task2, () => handleTaskCompletion("Task 2 completed"));
    taskQueue.enqueue(task3, () => handleTaskCompletion("Task 3 completed"));
  };

  React.useEffect(() => {
    enqueueTasks();
  }, []);

  return (
    <div>
      <h1>Task Queue</h1>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
