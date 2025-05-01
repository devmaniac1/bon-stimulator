const getReadinessInterpretation = (score: number): string => {
  if (score <= 2.4)
    return "Foundational Readiness – Clarify vision and align your leadership team.";
  if (score <= 3.4)
    return "Emerging Readiness – You're gaining traction, but alignment gaps remain.";
  if (score <= 4.2)
    return "Strategic Readiness – A strong foundation to scale transformation.";
  return "Execution-Ready – You’re primed for AI-powered execution and leadership acceleration.";
};

const getColorClass = (value: number = 0) => {
  if (value <= 1) return "bg-red-500";
  if (value <= 2) return "bg-yellow-400";
  if (value <= 3) return "bg-blue-500";
  return "bg-green-500";
};
const getColorClassForSummary = (value: number = 0) => {
  if (value <= 20) return "bg-red-500";
  if (value <= 40) return "bg-yellow-400";
  if (value <= 60) return "bg-blue-500";
  return "bg-green-500";
};

const getInterpretationColor = (averageScore: number): string => {
  if (averageScore <= 2.4) return "#dc2626"; // Red → Foundational
  if (averageScore <= 3.4) return "#f59e0b"; // Amber → Emerging
  if (averageScore <= 4.2) return "#3b82f6"; // Blue → Strategic
  return "#16a34a"; // Green → Execution-Ready
};

export { getReadinessInterpretation, getColorClass, getColorClassForSummary ,getInterpretationColor};
