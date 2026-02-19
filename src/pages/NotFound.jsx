import React from "react";

const NotFound = () => {
  return (
    <section className="error-content" data-error-content>
      <h2 className="heading">404</h2>
      <p className="body-1">Page not found!</p>
      <a
        href="/#/weather?lat=51.5073219&lon=-0.1276474"
        className="btn-primary"
      >
        <span className="span">Go Home</span>
      </a>
    </section>
  );
};

export default NotFound;
