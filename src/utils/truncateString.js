
export const truncateString = (str) => {
  if (str.length > 25) {
    return str.slice(0, 22) + "...";
  }
  return str;
}