import Cookies from "universal-cookie";

const cookies = new Cookies();

const cookieObject = {
  get: (key) => cookies.get(key),
  set: (key, value) =>
    cookies.set(key, value, {
      path: "/",
    }),
  del: (key) => cookies.remove(key),
};

export default cookieObject;
