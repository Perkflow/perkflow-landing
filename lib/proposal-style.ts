export const proposalStatusColors: Record<string, string> = {
  "Pay quote": "text-[#F9A826] bg-[#F9A826]/20",
  Confirmed: "text-green-600 bg-green-100",
  "In review": "text-blue-600 bg-blue-100",
  Declined: "text-red-600 bg-red-100",
};

export const proposalBorderColors: Record<string, string> = {
  "Pay quote": "border-l-[#F9A826]",
  Confirmed: "border-l-green-600",
  "In review": "border-l-blue-600",
  Declined: "border-l-red-600",
};

export function getProposalStyle(status: string) {
  return {
    badge: proposalStatusColors[status] || "text-gray-600 bg-gray-100",
    border: proposalBorderColors[status] || "border-l-gray-300",
  };
}
