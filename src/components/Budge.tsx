interface BudgeProps {
  children: React.ReactNode;
  className?: string;
}
export default function Budge({ children, className }: BudgeProps) {
  return <div className={className}>{children}</div>;
}
