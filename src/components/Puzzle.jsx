import { useState } from 'react';
import './Puzzle.css';

export default function Puzzle() {
  const [result, setResult] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setResult(formData.get('numbers') || '');
  }

  return (
    <>
      <form className="numbers-form" onSubmit={handleSubmit}>
        <label className="numbers-textarea-label" htmlFor="numbers-textarea">
          Числа
        </label>
        <p className="numbers-help" id="numbers-help">
          Введіть числа через пробіл, кому або кожне з нового рядка.
        </p>
        <textarea
          className="numbers-textarea"
          name="numbers"
          id="numbers-textarea"
          aria-describedby="numbers-help"
          placeholder="Наприклад: 1234, 4567, 7890"
        />
        <button className="numbers-submit-button" type="submit">
          Скласти пазл
        </button>
      </form>

      {result && (
        <p className="puzzle-result" role="status">
          {result}
        </p>
      )}
    </>
  );
}
