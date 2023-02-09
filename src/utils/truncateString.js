
export const truncateString = (s) => {
  if (s.length > 25) {
    return s.slice(0, 22) + "...";
  }
  return s;
}