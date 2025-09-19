interface AuthButtonProps {
  content: string;
  onClick?: () => void;
}

function BigButton({ content, onClick }: AuthButtonProps) {
  return (
    <button
      className="w-full h-12 text-center bg-primary-green text-text-black font-semibold text-xl rounded-sm mt-5"
      onClick={onClick}
    >
      {content}
    </button>
  );
}

export default BigButton;
