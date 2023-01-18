import lib from "interpolate";

export const interpolate = (text, obj = {}) => {
  return lib(text, obj, { delimiter: "::" });
};
