export const ContentSection: React.FC<{
  title: string;
  children: React.ReactNode;
  className?: string;
}> = ({ title, children, className = "" }) => (
  <div
    className={`mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm ${className}`}
  >
    <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
    {children}
  </div>
);
