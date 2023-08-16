import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { OrdersContext } from './contexts/orders.context';
import InventoryPage from './pages/InventoryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import DemoControls from './components/DemoControls.jsx';
import { useQuery } from 'react-query';
import { authenticateUser } from './services/authenticationAPIcalls.js';
import { useAuth } from "./contexts/auth.context";
import ScaleLoader from "react-spinners/ScaleLoader.js";
import OrderedDeliveredPopup from "./components/Inventory/popups/OrderedDeliveredPopup.jsx";
import Sidebar from "react-sidebar";
import SidebarContent from "./components/Sidebar/SidebarContent";

export default function AppRouterContent() {
  const { isLoggedIn, logIn, logOut } = useAuth();
  const { displayOrderedDeliveredPopup, setDisplayOrderedDeliveredPopup } =
    useContext(OrdersContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const isDemo = params.get("demo") === "true";

  const { data, isError, isLoading } = useQuery(
    "authenticateUser",
    authenticateUser,
    {
      onSuccess: (data) => {
        if (data.id) {
          logIn();
        }
      },
    }
  );

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarStyles = {
    background: "var(--dark-grey)",
    position: "fixed",
    width: sidebarCollapsed ? "45px" : "185px",
    transition: "width .3s ease-in-out",
  };

  const sidebarContent = (
    <div>
      <SidebarContent onToggle={toggleSidebar} collapsed={sidebarCollapsed} />
    </div>
  );

  return (
    <>
      {displayOrderedDeliveredPopup && <OrderedDeliveredPopup />}
      {isLoading ? (
        <div className="scale-loader-container">
          <ScaleLoader
            color={"#3b9893"}
            loading={isLoading}
            height={200}
            width={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          {isLoggedIn ? (
            <Sidebar
              sidebar={sidebarContent}
              open={true}
              docked={true}
              styles={{ sidebar: sidebarStyles }}
              pullRight={false}
            >
              <Routes>
                <Route path="/" element={<InventoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
              {(location.pathname === "/orders" ||
                location.pathname === "/" ||
                isDemo) && <DemoControls />}
            </Sidebar>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}
