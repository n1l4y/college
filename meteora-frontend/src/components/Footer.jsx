import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="body-3">Copyright 2024 n1l4y. All Rights Reserved.</p>
      <p className="body-3">
        Powered By{" "}
        <a
          href="https://openweathermap.org/api"
          title="Free OpenWeather Api"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/openweather.png"
            loading="lazy"
            width="150"
            height="30"
            alt="OpenWeather"
          />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
