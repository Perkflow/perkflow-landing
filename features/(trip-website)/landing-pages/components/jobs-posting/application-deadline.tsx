import { Calendar } from "lucide-react";

export const ApplicationDeadline: React.FC<{ deadline: string }> = ({
  deadline,
}) => (
  <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-4">
    <div className="mb-2 flex items-center gap-2">
      <Calendar size={20} className="text-orange-600" />
      <h3 className="font-bold text-orange-900">Application Deadline</h3>
    </div>
    <p className="mb-1 font-medium text-orange-800">{deadline}</p>
    <p className="text-sm text-orange-700">
      Dont miss out on this opportunity!
    </p>
  </div>
);
