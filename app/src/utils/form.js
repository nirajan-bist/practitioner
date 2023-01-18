import { handleError } from "./error";

export async function submitWrapper(handleSubmit, onError) {
  try{
    await handleSubmit();
  }catch(err){
    handleError(err)
    if(onError){
      await onError(err);
    }
  }
}