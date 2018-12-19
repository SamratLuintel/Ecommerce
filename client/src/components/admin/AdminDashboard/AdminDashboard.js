import React, { Component } from "react";
import AdminSideNav from "../../common/admin/AdminSideNav/AdminSideNav";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import DashboardContent from "./DashboardContent/DashboardContent";

class AdminDashboard extends Component {
  render() {
    return (
      <div className="AdminDashboard">
        <AdminSideNav />
        <div className="AdminDashboard__main-dashboard-area">
          <DashboardHeader />
          <DashboardContent />
        </div>
      </div>
    );
  }
}
export default AdminDashboard;
