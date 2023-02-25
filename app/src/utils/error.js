import config from "config";
import { toast } from "react-toastify";

export function handleError(err){
  if(config.env === 'DEV') console.log(err.response?.data);

  const message = err.response?.data.error?.message 

  toast.error(message);
}