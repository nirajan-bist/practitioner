import { handleError } from "utils/error";
import http from "utils/http";
import { interpolate } from "utils/string";

export const fetchAll = async () => {
  try {
    const { data: response } = await http.get("/practitioner");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addOne = async (payload) => {
  try {
    const { data: response } = await http.post("/practitioner", payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteOne = async (payload) => {
  try {
    const { data: response } = await http.delete(
      interpolate("/practitioner/:id:", { id: payload })
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
export const updateOne = async (payload) => {
  try {
    const practitioner = {
      email: payload.email,
      fullname: payload.fullname,
      contact: payload.contact,
      dob: payload.dob,
      startTime: payload.startTime,
      endTime: payload.endTime,
      workingDays: payload.workingDays,
      imageUrl: payload.imageUrl,
    };
    const { data: response } = await http.put(
      interpolate("/practitioner/:id:", { id: payload.id }),
      practitioner
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
