import type { ReactNode } from 'react';

interface UserMenuListItemProps {
  content: string;
  children: ReactNode;
  onClick?: () => void;
}

function UserMenuListItem({
  content,
  children,
  onClick,
}: UserMenuListItemProps) {
  return (
    <div
      className="flex items-center gap-2 h-10 cursor-pointer"
      onClick={onClick}
    >
      {children}
      <span>{content}</span>
    </div>
  );
}

export default UserMenuListItem;
