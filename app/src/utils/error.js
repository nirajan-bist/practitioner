import { toast } from "react-toastify";

export function handleError(err){
  console.log(err.response?.data);

  const message = err.response?.data.error?.message 

  toast.error(message);
}