export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "bg-green-500";
    case "medium":
      return "bg-blue-500";
    case "hard":
      return "bg-red-500";
    default:
      return "badge-ghost";
  }
};
