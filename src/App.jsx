import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home/Home";
import { smallActions } from "./context";


export const App = () => {
  return (
    <div
      className="w-screen h-screen overflow-x-hidden flex flex-col"
      onScroll={(e) => smallActions.handleScroll(e.currentTarget.scrollTop)}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};
