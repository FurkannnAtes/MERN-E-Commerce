import React, { useContext, useState } from "react";
import NotFound from "../../components/404";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
import Table from "../../components/admin/Table";
import { MainContext } from "../../context/context";

const Admin = () => {
  const [showSideBar, setShowSideBar] = useState("hidden");
  const { user } = useContext(MainContext);
  if (user?.isAdmin === true) {
    return (
      <div className="container flex ">
        <Sidebar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        <div className="flex flex-col w-full">
          <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
          <div className="flex items-center justify-center min-h-[85vh] p-5 pb-0">
            <Table />
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
};

export default Admin;
