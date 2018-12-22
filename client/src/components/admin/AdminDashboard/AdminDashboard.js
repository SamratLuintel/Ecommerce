import React, { Component } from "react";
import AdminSideNav from "../../common/admin/AdminSideNav/AdminSideNav";
import DashboardContent from "./DashboardContent/DashboardContent";
import AdminHeader from "../../common/admin/AdminHeader/AdminHeader";

class AdminDashboard extends Component {
  render() {
    return (
      <div className="AdminDashboard">
        <AdminSideNav />
        {/* Margin left of -260px */}
        <div className="AdminDashboard__main-dashboard-area">
          <AdminHeader />
          <DashboardContent />
        </div>
      </div>
    );
  }
}
export default AdminDashboard;
