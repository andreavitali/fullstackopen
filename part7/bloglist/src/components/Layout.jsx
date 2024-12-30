import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";
import LoginForm from "./LoginForm";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.login);
  let location = useLocation();

  const handleLogoutBtn = e => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };

  return user === null ? (
    <LoginForm location={location} />
  ) : (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogoutBtn}>logout</button>
      </p>
      <Outlet />
    </div>
  );
};

export default Layout;
