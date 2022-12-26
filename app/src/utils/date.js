export function timestapToDate(timestamp){
  if(timestamp) return timestamp.split('T')[0];
  return timestamp;
}