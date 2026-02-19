import { useState, useEffect } from "react";
import { signup } from "../js/helper";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState("Sign up");
  const [locationGranted, setLocationGranted] = useState(false);
  

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log(position.coords)
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError("Error getting location");
          console.error("Geolocation error:", error);
          toast.error("Grant location permission to continue");
        }
      );
    } else {
      setLocation({
        latitude: 51.5073219,
        longitude: -0.1276474,
      });
      setError("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getLocation();
  }, [])

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (!location.latitude || !location.longitude) {
      toast.error("Grant location permission to continue");
      return;
    }

    try {
      setLoading("Loading...");
      const data = await signup(
        name,
        email,
        password,
        location.latitude,
        location.longitude
      );
      // console.log("Signup successful:", data);
      localStorage.setItem("atoken", data?.token);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      toast.success("Signup Successfully.");
      // Redirect or show success message
    } catch (err) {
      console.log(err);
      setError(err.msg || "Signup failed");
      toast.error(err.msg || "Signup failed");
    } finally {
      setLoading("Sign up");
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
        <h1 className="title_1 mb">Sign up</h1>
        <input
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          type="text"
          className="search-field"
        />
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          className="search-field"
        />
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="search-field"
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "white", display: "flex", gap: "10px" }}>
              Already have an account?{" "}
              <Link style={{ textDecoration: "underline" }} to="/login">
                Sign in
              </Link>
            </p>
            <button
              type="submit"
              style={{ width: "100%" }}
              className="btn-primary"
            >
              {loading}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
