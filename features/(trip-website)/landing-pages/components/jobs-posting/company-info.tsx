import { ExternalLink, Star } from "lucide-react";

export const CompanyInfo: React.FC<{
  companyInfo: {
    description: string;
    industry: string;
    size: string;
    rating: number;
  };
}> = ({ companyInfo }) => (
  <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    <h2 className="mb-4 text-xl font-bold text-gray-900">
      About TechVision Inc
    </h2>
    <p className="mb-6 text-gray-700">{companyInfo.description}</p>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div>
        <p className="mb-1 text-sm text-gray-500">Industry</p>
        <p className="font-medium text-gray-900">{companyInfo.industry}</p>
      </div>
      <div>
        <p className="mb-1 text-sm text-gray-500">Company Size</p>
        <p className="font-medium text-gray-900">{companyInfo.size}</p>
      </div>
      <div>
        <p className="mb-1 text-sm text-gray-500">Rating</p>
        <div className="flex items-center gap-1">
          <Star size={16} className="fill-current text-yellow-500" />
          <span className="font-medium text-gray-900">
            {companyInfo.rating}
          </span>
        </div>
      </div>
    </div>

    <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
      Visit Website
      <ExternalLink size={16} />
    </button>
  </div>
);
