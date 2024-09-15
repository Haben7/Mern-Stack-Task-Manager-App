import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import TaskList from "./taskList";

function Home() {
  return (
    <>
      <Header />
      <div className="pls">
        <Sidebar />
          <TaskList />
      </div>
    </>
  );
}

export default Home;
