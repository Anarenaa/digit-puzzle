import { useState } from 'react';
import { buildChain } from '../utils/buildChain';
import './Puzzle.css';

export default function Puzzle() {
  const [result, setResult] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const numbersString = formData.get('numbers');

    if (typeof numbersString === 'string') {
      setResult(buildChain(numbersString));
    }
  }

  return (
    <div className="puzzle-container">
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
        <div className="result-container">
          <p className="result-length" role="status">
            Найдовший ланцюжок: {result.chainCount}
          </p>
          <p className="puzzle-result" role="status">
            {result.chain}
          </p>
          <p className="puzzle-result" role="status">
            {result.chainArr.join(' & ')}
          </p>
        </div>
      )}
    </div>
  );
}
