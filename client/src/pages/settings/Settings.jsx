import React from "react";
import Setting from "../../components/setting/Setting";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";

export default function Settings() {
  return <div className="settings">
      <Setting/>
      <Sidebar/>
  </div>;
}
