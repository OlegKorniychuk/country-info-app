import z from 'zod';

export const validateSaveHolidays = z.object({
  countryCode: z.string().length(2),
  year: z.number().min(1900).max(2100),
  holidays: z.array(z.string()).nonempty()
});
