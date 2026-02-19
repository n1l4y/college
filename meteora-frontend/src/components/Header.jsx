import React from "react";
import { Link } from "react-router-dom";
const API_URL = `https://meteora-backend-three.vercel.app/api/auth`;
import axios from "axios";

const Header = ({ isAuthenticated, updateWeather }) => {
  const currentLocation = async function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (res) => {
          const { latitude, longitude } = res.coords;
          updateWeather(`lat=${latitude}`, `lon=${longitude}`);
          const token = localStorage.getItem("atoken");
          if (token) {
            const response = await axios.patch(
              `${API_URL}/updatelonglat`,
              {
                latitude,
                longitude,
              },
              {
                headers: {
                  "x-auth-token": token,
                },
              }
            );
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Fallback to default location if geolocation fails
          getPage();
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <header className="header">
      <div className="container">
        <a href="#/weather?lat=51.5073219&lon=-0.1276474" className="logo">
          <img src="/images/logo.png" width="364" height="58" alt="logo" />
        </a>

        <div className="search-view" data-search-view>
          <div className="search-wrapper">
            <input
              type="search"
              name="search"
              placeholder="Search city..."
              autoComplete="off"
              className="search-field"
              data-search-field
            />
            <span className="m-icon leading-icon">search</span>

            <button
              className="icon-btn leading-icon has-state"
              aria-label="close search"
              data-search-toggler
            >
              <span className="m-icon">arrow_back</span>
            </button>
          </div>

          <div className="search-result" data-search-result></div>
        </div>

        <div className="header-actions">
          <button
            className="icon-btn has-state"
            aria-label="open search"
            data-search-toggler
          >
            <span className="m-icon icon">search</span>
          </button>

          <button
            className="btn-primary has-state"
            onClick={currentLocation}
            data-current-location-btn
          >
            <span className="m-icon">my_location</span>
            <span className="span">Current Location</span>
          </button>
          {!isAuthenticated ? (
            <Link to="/login" className="btn-primary has-state">
              <span className="m-icon">lock</span>
              <span className="span">Login</span>
            </Link>
          ) : (
            <div
              style={{ cursor: "pointer" }}
              className="btn-primary has-state"
              onClick={() => {
                // logout()
                localStorage.clear();
                window.location.reload();
              }}
            >
              <span className="m-icon">logout</span>
              <span className="span">Logout</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
