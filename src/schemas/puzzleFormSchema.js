import z from 'zod';

const ALLOWED_CHARS_REGEX = /^[\d,\s]+$/;
const SPLIT_REGEX = /[,\s]+/;

const getParts = (val) => val.split(SPLIT_REGEX).filter(Boolean);

export const puzzleFormSchema = z.object({
  numbersInput: z
    .string()
    .trim()
    .min(1, 'Введіть хоча б одне число')
    .refine((val) => ALLOWED_CHARS_REGEX.test(val), {
      message: 'Використано недозволені символи або роздільники',
    })
    .refine(
      (val) => {
        const parts = getParts(val);
        return parts.length > 0 && parts.every((part) => /^\d+$/.test(part));
      },
      { message: 'Кожен фрагмент має містити лише цифри' },
    )
    .refine((val) => getParts(val).every((part) => part.length > 2), {
      message: 'Кожне число має містити більше ніж 2 цифри',
    }),
});
