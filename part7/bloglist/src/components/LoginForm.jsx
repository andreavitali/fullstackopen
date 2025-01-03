import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/loginReducer";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = ({ location }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doLogin = event => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
    setUsername("");
    setPassword("");
    navigate(location?.pathname || "/", { replace: true });
  };

  return (
    <form onSubmit={doLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          data-testid="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          data-testid="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
