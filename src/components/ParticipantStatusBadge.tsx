interface StatusBadgeProps {
  status: 'CONFIRMED' | 'SUSPENDED';
  content: string;
}

function StatusBadge({ status, content }: StatusBadgeProps) {
  if (status == 'CONFIRMED')
    return (
      <span className="text-xs bg-primary-green text-text-black rounded-md px-1 py-0.5">
        {content}
      </span>
    );
  else
    return (
      <span className="text-xs text-text-white bg-bg-400 px-1 py-0.5 rounded-md">
        {content}
      </span>
    );
}

export default StatusBadge;
