import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signin } from "../js/helper";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const data = await signin(email, password);
      // console.log('Signup successful:', data);
      toast.success("Login Successfully.");
      localStorage.setItem("atoken", data?.token);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      if (err && err.msg) {
        toast.error(err.msg);
      } else {
        toast.error("Login unsuccessfully.");
      }
    }
  };
  return (
    <div className="login__parent">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="login__child"
        noValidate
      >
        <h1 className="title_1 mb">Login</h1>

        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          type="email"
          className="search-field"
        />
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="search-field"
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ color: "white", display: "flex", gap: "10px" }}>
            Don&apos;t have an account?{" "}
            <Link style={{ textDecoration: "underline" }} to="/signup">
              Signup
            </Link>
          </p>
          <button
            type="submit"
            style={{ width: "100%" }}
            className="btn-primary"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
