import type { ReactNode } from 'react';

interface MenuListItemProps {
  content: string;
  children: ReactNode;
  onClick?: () => void;
}

function MenuListItem({ content, children, onClick }: MenuListItemProps) {
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

export default MenuListItem;
