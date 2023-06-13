import React, { useState } from "react";
import UserContext from "./context/UserContext";
import { HashRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
import HomePage from "./components/home";
import DashboardLayout from "./components/dashboard/layouts/dashboard.layout";
import Dashboard from "./components/dashboard/pages/Dashboard/Dashboard";
import ManageGymBranch from "./components/dashboard/pages/ManageGymBranch/ManageGymBranch";
import ManageUser from "./components/dashboard/pages/ManageUsers/ManageUser";
import ManageGymMain from "./components/dashboard/pages/ManageGymMain/ManageGymMain";
import GymDetailComponent from "./components/dashboard/pages/ManageGymMain/GymDetailComponent";
import ManageMembership from "./components/dashboard/pages/ManageMembership/ManageMembership";
import GymBranchDetails from "./components/dashboard/pages/ManageGymBranch/GymBranch/GymBranchDetails";
import ManageTrainer from "./components/dashboard/pages/ManageGymBranch/GymBranch/manageTrainer";
import ManageClass from "./components/dashboard/pages/ManageGymBranch/GymBranch/manageClass";
import Setting from "./components/dashboard/pages/SettingsPage/Setting";
import UserDetailPage from "./components/dashboard/pages/UserDetailPage/UserDetailPage";

const PrivateRoute = ()=>{
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated? <DashboardLayout/> : <Navigate to="/"/>;
}
const App = () => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        <HashRouter>
            <Routes>
              <Route exact path="/" element={<HomePage/>} />
              <Route path="/" element={<PrivateRoute/>}>
                  <Route path="dashboard" element={<Dashboard/>} />
                  <Route path="branches" element={<ManageGymBranch/>} />
                  <Route path="user" element={<ManageUser/>} />
                  <Route path="membership" element={<ManageMembership/>} />
                  <Route path="settings" element={<Setting/>} />
                  <Route path="logout" element={<Dashboard/>} />
                  <Route path="gyms" element={<ManageGymMain/>}/>
                  <Route path="gymdetail" element={<GymDetailComponent/>}/>
                  <Route path="gymBranchDetails" element={<GymBranchDetails/>}/>
                  <Route path="edituser" element={<UserDetailPage/>} />
                  <Route path="gymedittrainer" element={<ManageTrainer/>}/>
                  <Route path="gymeditclass" element={<ManageClass/>} />
              </Route>
            </Routes>
          </HashRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
