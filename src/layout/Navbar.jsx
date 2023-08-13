import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// Context
import { UserContext } from "../context/user/UserContext";
import { logout } from "../context/user/UserActions";
// Toast
import toast from "react-hot-toast";

const Navbar = () => {
  const { userState, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    dispatch({ type: "LOGOUT_USER" });
    navigate("/login");
    toast.success("Logged out Successfully");
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          Social Gram
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://i.pinimg.com/474x/0a/a8/58/0aa8581c2cb0aa948d63ce3ddad90c81.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {userState.user && (
              <>
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
