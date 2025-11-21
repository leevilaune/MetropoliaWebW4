import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router";
import { useUserContext } from "../hooks/contextHooks";
import { useNavigate } from "react-router";

const Layout = () => {
  const { handleAutoLogin, loading, user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    handleAutoLogin();
  }, []);
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/upload">Upload</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </>
          )}

          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
