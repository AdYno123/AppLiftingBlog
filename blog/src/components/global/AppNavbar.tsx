import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../constans/auth-context";
import { FaCat } from "react-icons/fa";
import user from "../../images/user.png";

const AppNavbar = () => {
  const authContext = useContext(AuthContext);
  const history = useNavigate();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const handleLogOut = (option: string) => {
    if (option === "1") {
      setShowDropDown(false);
      authContext.logout(true);
      history("/home", { replace: true });
    }
  };
  return (
    <nav className="bg-gray-100">
      <section className="container mx-auto flex justify-between">
        <ul className="flex">
          <li className="App-navbar-item mx-4 my-1">
            <NavLink to="/home">
              <FaCat className="text-4xl" />
            </NavLink>
          </li>
          <li className="App-navbar-item mx-4 my-3">
            <NavLink to="/home">Recent Articles </NavLink>
          </li>
          <li className="App-navbar-item mx-4 my-3">About</li>
        </ul>
        <div className="App-navbar-item mx-4 my-3 flex justify-end">
          {!authContext.isLogged && (
            <p className="mx-2">
              <NavLink to="/login">Log In</NavLink>
            </p>
          )}
          {authContext.isLogged && (
            <>
              <p className="mx-2">
                <NavLink to="/homeAdmin">My Articles</NavLink>
              </p>
              <p className="mx-2 text-blue-500 text-bold">
                <NavLink to="/createArticle">Create Article</NavLink>
              </p>
              <button
                className="ml-3"
                onClick={() => setShowDropDown(!showDropDown)}
              >
                <img src={user} alt="user" className="h-6 aspect-square" />
              </button>
              {showDropDown && (
                <select
                  defaultValue="0"
                  name="cars"
                  id="cars"
                  onChange={(event) => handleLogOut(event.target.value)}
                >
                  <option value="0" disabled hidden>
                    Choose here
                  </option>
                  <option value="1">Log Out</option>
                </select>
              )}
            </>
          )}
        </div>
      </section>
    </nav>
  );
};

export default AppNavbar;
