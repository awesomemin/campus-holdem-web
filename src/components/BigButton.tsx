interface AuthButtonProps {
  content: string;
}

function BigButton({ content }: AuthButtonProps) {
  return (
    <button className="w-full h-12 text-center bg-primary-green text-text-black font-semibold text-xl rounded-sm mt-5">
      {content}
    </button>
  );
}

export default BigButton;
