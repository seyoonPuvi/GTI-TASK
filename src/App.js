import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const appRouter = createBrowserRouter(
    [
      { path: "/", element: <LoginPage /> },
      { path: "/home", element: <HomePage /> },
    ],
    { basename: "/GTI-TASK" }
  );

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
