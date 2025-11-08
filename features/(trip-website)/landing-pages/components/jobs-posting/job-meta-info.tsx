import { Calendar, Clock, DollarSign, MapPin } from "lucide-react";

export const JobMetaInfo: React.FC<{
  location: string;
  type: string;
  salary: string;
  postedDate: string;
}> = ({ location, type, salary, postedDate }) => (
  <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div className="flex items-center gap-2">
        <MapPin size={20} className="text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium text-gray-900">{location}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Clock size={20} className="text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="font-medium text-gray-900">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DollarSign size={20} className="text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Salary</p>
          <p className="font-medium text-gray-900">{salary}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Calendar size={20} className="text-gray-500" />
        <div>
          <p className="text-sm text-gray-500">Posted</p>
          <p className="font-medium text-gray-900">{postedDate}</p>
        </div>
      </div>
    </div>
  </div>
);
