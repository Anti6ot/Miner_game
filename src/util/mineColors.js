export const mineColor = () => {
  let colors = ["orange", "darkgreen", "cyan", "violet", "red"];
  return colors[Math.floor(Math.random() * colors.length)];
};
