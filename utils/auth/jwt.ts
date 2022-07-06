import Router from "next/router";
import Cookies from "js-cookie";

import jwt from "jsonwebtoken";

const SECRET_KEY: any = process.env.JWT_SECRET;
const API_SECRET_KEY: any = process.env.JWT_API_SECRET;

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyToken(jwtToken: any) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (e) {
    //console.log('e:', e);
    return null;
  }
}

export function verifyAPIToken(jwtToken: any) {
  try {
    return jwt.verify(jwtToken, API_SECRET_KEY);
  } catch (e) {
    //console.log('e:', e);
    return null;
  }
}

/*
 * @params {request} extracted from request response
 * @return {object} object of parse jwt cookie decode object
 */
export function getAppCookies(req: any) {
  const parsedItems: any = {};
  if (req.headers.cookie) {
    const cookiesItems = req.headers.cookie.split("; ");
    cookiesItems.forEach((cookies: any) => {
      const parsedItem: any = cookies.split("=");
      parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
    });
  }
  return parsedItems;
}

export function absoluteUrl(req: any, setLocalhost: any) {
  var protocol = "https:";
  var host = req
    ? req.headers["x-forwarded-host"] || req.headers["host"]
    : window.location.host;
  if (host.indexOf("localhost") > -1) {
    if (setLocalhost) host = setLocalhost;
    protocol = "http:";
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host,
    url: req,
  };
}

/*
 * @params {none} set action for logout and remove cookie
 * @return {function} router function to redirect
 */
export function setLogout(e: any) {
  e.preventDefault();
  Cookies.remove("token");
  Router.push("/login");
}

export function testJSON(text: any) {
  try {
    return typeof text === "object";
  } catch (e) {
    return false;
  }
}
