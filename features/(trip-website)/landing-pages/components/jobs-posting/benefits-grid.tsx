export const BenefitsGrid: React.FC<{ benefits: string[] }> = ({
  benefits,
}) => (
  <div className="grid gap-3">
    {benefits.map((benefit, index) => (
      <div key={index} className="flex items-start gap-2">
        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-teal-600"></span>
        <span className="text-gray-700">{benefit}</span>
      </div>
    ))}
  </div>
);
