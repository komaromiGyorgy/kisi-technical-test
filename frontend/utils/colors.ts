export function getRandomColor() {
  const colors = [
    "var(--midnight-purple)",
    "var(--connect-blue)",
    "var(--connect-tint)",
    "var(--warm-grey)",
    "var(--alarm-yellow)",
    "var(--approve-green)",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}
