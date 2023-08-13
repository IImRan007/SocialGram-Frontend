import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Context
import { UserContext } from "../context/user/UserContext";
import { login } from "../context/user/UserActions";
// Toast
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };

      const response = await login(userData);
      dispatch({ type: "LOGIN_USER", payload: response });

      navigate("/");
      toast.success("Logged In Successfully✌️");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6 pr-8">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="card flex-shrink-0 w-full max-w-xl shadow-2xl bg-base-100"
        >
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="input input-bordered input-accent"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="input input-bordered input-accent"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div>
              <p className="text-center">
                New User?{" "}
                <Link to={"/register"}>
                  <span className="font-semibold cursor-pointer hover:text-accent">
                    {" "}
                    Register here
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
