import React, { useEffect } from "react";
import { Link, Outlet } from "react-router";
import { useUserContext } from "../hooks/contextHooks";
import { useNavigate } from "react-router";

const Layout = () => {
  const { handleAutoLogin, user } = useUserContext();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div className="max-w-[1280px] mx-auto p-8">
      <nav>
        <ul
          className="
            flex justify-end list-none m-0 p-0 overflow-hidden bg-[#333]

            *:flex
            *:items-center

            *:*:block
            *:*:text-white
            *:*:text-center
            *:*:p-4
            *:*:no-underline

            *:*:hover:bg-[#111]
          "
        >
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

export default Layout;
