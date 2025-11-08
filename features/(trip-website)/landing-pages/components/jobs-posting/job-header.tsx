import { Bookmark, Share2 } from "lucide-react";

export const JobHeader: React.FC<{
  title: string;
  company: string;
  logo: string;
  onApply: () => void;
}> = ({ title, company, logo, onApply }) => (
  <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:gap-0">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-800 text-2xl font-bold text-white">
          {logo || "T"}
        </div>
        <div>
          <h1 className="mb-1 text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600">{company}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:text-gray-700">
          <Bookmark size={20} />
        </button>
        <button className="rounded-lg border border-gray-200 p-2 text-gray-500 transition-colors hover:text-gray-700">
          <Share2 size={20} />
        </button>
        <button
          onClick={onApply}
          className="rounded-lg bg-teal-700 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-800"
        >
          Apply Now
        </button>
      </div>
    </div>
  </div>
);
