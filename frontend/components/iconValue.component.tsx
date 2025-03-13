
interface IconValueProps {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number | boolean;
}

export default function IconValue({ Icon, label, value }: IconValueProps) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="text-2xl" />
      <div className="text-sm">
        <span className="font-semibold">{label}: </span>
        <span>{value}</span>
      </div>
    </div>
  );
}