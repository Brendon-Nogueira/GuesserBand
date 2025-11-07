interface GuessInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isDisabled: boolean;
}

const GuessInput: React.FC<GuessInputProps> = ({ value, onChange, onSubmit, isDisabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isDisabled) {
      onSubmit();
    }
  };

  return (
    <div className="guess-input-container">
      <input
        type="text"
        placeholder="Qual é a banda?"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
      />
      <button onClick={onSubmit} disabled={isDisabled}>
        Adivinhar
      </button>
    </div>
  );
};

export default GuessInput;