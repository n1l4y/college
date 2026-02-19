/**
 * @fileoverview Manage all routes
 * @copyright n1l4y 2024 All rights reserved
 * @author n1l4y <nilayshah630@gmail.com>
 */

"use strict";

import { getUser } from "../../helpers/helper.js";
import { updateWeather, error404 } from "./app.js";

const defaultLocation = '#/weather?lat=51.5073219&lon=-0.1276474'

const getPage = async () => {
  const user = await getUser()
  window.location.href = `#/weather?lat=${user?.latitude}&lon=${user?.longitude}`
}

export const currentLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        const { latitude, longitude } = res.coords;
        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
      },
      (err) => {
        console.error("Geolocation error:", err);
        // Fallback to default location if geolocation fails
  
        const token = localStorage.getItem('atoken')
        if (!token) {
          window.location.hash = defaultLocation
        }
        else {
          getPage()
        }
  
      }
    );
  } else {
    console.log('Geolocation is not supported by this browser.')
  }

};

/**
 *
 * @param {string} query Searched query
 */
const searchedLocation = (query) => updateWeather(...query.split("&"));
// updateWeather("lat=51.5073219", "lon=-0.1276474")

const routes = new Map([
  ["/current-location", currentLocation],
  ["/weather", searchedLocation],
]);

const checkHash = function () {
  const requestURL = window.location.hash.slice(1);

  const [route, query] = requestURL.includes
    ? requestURL.split("?")
    : [requestURL];

  routes.get(route) ? routes.get(route)(query) : error404();
};

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function () {
  if (!window.location.hash) {
    window.location.hash = "#/current-location";
  } else {
    checkHash();
  }
});
