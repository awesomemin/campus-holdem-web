import type { ReactNode } from 'react';

interface UserMenuListProps {
  content: string;
  children: ReactNode;
  onClick?: () => void;
}

function UserMenuList({ content, children, onClick }: UserMenuListProps) {
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

export default UserMenuList;
