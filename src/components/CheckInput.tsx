import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';

interface CheckInputProps {
  checked: boolean;
  onClick: () => void;
  disabled: boolean;
}

function CheckInput({ checked, onClick, disabled }: CheckInputProps) {
  if (disabled) return <CheckBoxOutlineBlank sx={{ color: '#4e5257' }} />;
  return (
    <div className="inline" onClick={onClick}>
      {checked ? (
        <CheckBox sx={{ color: '#00c896' }} />
      ) : (
        <CheckBoxOutlineBlank sx={{ color: '#4e5257' }} />
      )}
    </div>
  );
}

export default CheckInput;
