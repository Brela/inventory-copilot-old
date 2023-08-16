import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFile,
  faFilter,
  faGear,
  faSearch,
  faShoppingBag,
  faRightFromBracket,
  faUser,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css";
import "./SearchInput.css";
import SearchInput from "./SearchInput";
import { AuthContext } from "../../contexts/auth.context";
import { logoutUser } from "../../services/userAPIcalls";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../services/authenticationAPIcalls";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

const SidebarContent = ({ onToggle, collapsed }) => {
  const { logOut } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(true);
  const [profilePopup, setProfilePopup] = useState(false);

  const { data, isError } = useQuery("authenticateUser", authenticateUser, {
    onSuccess: async (data) => {
      if (data !== "JsonWebTokenError" && data !== "TokenExpiredError") {
        setUsername(data.username);
        setCompanyName(await getCompany(data.companyID));
        if (!data.id) {
          setUserIsLoggedIn(false);
        }
      }
    },
  });

  /*   const userSettingsBlock =
    '<div class="userInfo-container">' +
    `<p>Filter By: ${data?.settings.filterBy}</p>` +
    `<p>Sort Order: ${data?.settings.sortOrder}</p>` +
    "</div>";
 */
  useEffect(() => {
    authenticateUser();
  }, []);

  const handleLogoutUser = async () => {
    const confirmLogout = await Swal.fire({
      icon: "warning",
      title: "Logout",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
    });

    if (confirmLogout.isConfirmed) {
      await logoutUser();
      logOut();
      navigate("/login");
    }
  };

  const handleSettingsPopup = () => {
    if (data.id) {
      console.log(data);
      return Swal.fire({
        icon: "info",
        title: "Settings",
        html: userSettingsBlock,
        background: "#19191a",
        color: "#fff",
        confirmButtonColor: "#2952e3",
        showCancelButton: true,
        customClass: {
          confirmButton: "csv-upload-button",
          popup: "csv-instructions",
        },
      });
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <div className="sidebar-btn-container">
        {!collapsed && (
          <h2>
            <a href="/">Orderly</a>
          </h2>
        )}
        <button className="sidebarToggleIcon" onClick={onToggle}>
          <FontAwesomeIcon
            icon={collapsed ? faBars : faTimes}
            className={`sidebarToggleIcon ${collapsed ? "" : "expand"}`}
          />
        </button>
      </div>
      <ul className="nav-links">
        <NavLink to="/" activeclassname="active">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faFile} />
            {!collapsed && <span>Inventory</span>}
          </li>
        </NavLink>
        <NavLink to="/Orders" activeclassname="active">
          <li>
            <FontAwesomeIcon className="fa-sidebar-icon" icon={faShoppingBag} />
            {!collapsed && <span>Orders</span>}
          </li>
        </NavLink>
        {/*      <li onClick={() => handleSettingsPopup()}>
          <FontAwesomeIcon className="fa-sidebar-icon" icon={faGear} />
          {!collapsed && <span>Settings</span>}
        </li> */}

        <li
          onClick={() => {
            if (collapsed) {
              onToggle();
              setProfilePopup(true);
            } else {
              // toggle only when the sidebar is not collapsed
              setProfilePopup((prev) => !prev);
            }
          }}
        >
          <FontAwesomeIcon className="fa-sidebar-icon" icon={faUser} />
          {!collapsed && <span>Profile</span>}
        </li>
        {profilePopup && !collapsed && (
          <div className=" min-h-[100px] p-3 bg-gray-500 z-40 text-white text-sm flex flex-col gap-5 items-center">
            <p className="flex flex-wrap items-center">
              Username:
              <span className="text-lg pl-3">{username}</span>
            </p>
            <button
              onClick={handleLogoutUser}
              className="rounded-md px-2 bg-white"
            >
              Logout
            </button>
          </div>
        )}

        {/*  {userIsLoggedIn && (
          <li onClick={() => handleLogoutUser()}>
            <FontAwesomeIcon
              className="fa-sidebar-icon"
              icon={faRightFromBracket}
            />
            {!collapsed && <span>Log out</span>}
          </li>
        )} */}
      </ul>
      <ul className="filter-search-container">
        <li>
          <FontAwesomeIcon
            className="fa-sidebar-icon-fs"
            icon={faSearch}
            onClick={onToggle}
          />
          {!collapsed && (
            <span>
              <SearchInput />
            </span>
          )}
        </li>
      </ul>
      <div className="footer-side">
        {!collapsed && (
          <>
            {/*            <ul className="user-info">
              <li>Username: {username}</li>
            </ul> */}

            <div className="footer-span">
              <span>
                <a
                  rel="license"
                  href="http://creativecommons.org/licenses/by-nc/4.0/"
                >
                  <img
                    alt="Creative Commons License"
                    style={{ borderWidth: 0 }}
                    src="https://i.creativecommons.org/l/by-nc/4.0/80x15.png"
                  />
                </a>
              </span>
              <span>Orderly 2023</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarContent;
