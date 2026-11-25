import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { puzzleFormSchema } from '../schemas/puzzleFormSchema';
import { buildChain } from '../utils/buildChain';
import './Puzzle.css';

export default function Puzzle() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(puzzleFormSchema),
    defaultValues: { numbersInput: '' },
    mode: 'onSubmit',
  });

  const numbersInput = useWatch({
    control,
    name: 'numbersInput',
    defaultValue: '',
  });
  const hasInput = (numbersInput ?? '').trim().length > 0;

  function onSubmit({ numbersInput }) {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      try {
        setResult(buildChain(numbersInput));
      } finally {
        setIsLoading(false);
      }
    }, 0);
  }
  function handleReset() {
    setIsLoading(false);
    reset();
    setResult(null);
  }

  return (
    <div className="puzzle-container">
      <form
        className="numbers-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="numbers-textarea-label" htmlFor="numbers-textarea">
          Числа
        </label>
        <p className="numbers-help" id="numbers-help">
          Введіть числа (понад 2 цифри) через пробіл, кому або кожне з нового
          рядка.
        </p>
        <div className="textarea-container">
          <textarea
            {...register('numbersInput')}
            id="numbers-textarea"
            required
            placeholder="Наприклад: 1234, 4567, 7890"
            className={`numbers-textarea ${errors.numbersInput ? 'input-error' : ''}`}
            aria-invalid={errors.numbersInput ? 'true' : 'false'}
            aria-describedby="numbers-help numbers-error"
          />
          <p id="numbers-error" className="field-error">
            {errors.numbersInput?.message}
          </p>
        </div>
        <div className="buttons-container">
          <button
            className="numbers-submit-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Складання пазлу...' : 'Скласти пазл'}
          </button>
          {hasInput && (
            <button
              className="numbers-reset-button"
              type="reset"
              disabled={isLoading}
              onClick={handleReset}
            >
              Скинути
            </button>
          )}
        </div>
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
