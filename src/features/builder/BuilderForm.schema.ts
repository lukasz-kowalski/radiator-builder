import { z } from "zod";

export const builderSchema = z
  .object({
    radiatorFamily: z.string(),
    radiatorLengthFrom: z
      .string()
      .min(1, "Field cannot be empty")
      .transform((val) => Number(val))
      .pipe(
        z
          .number()
          .min(0, "Length cannot be negative")
          .max(10000, "Length cannot be greater than 10000")
      ),
    radiatorLengthTo: z
      .string()
      .transform((val) => (val ? Number(val) : undefined))
      .pipe(
        z
          .number()
          .min(0, "Length cannot be negative")
          .max(10000, "Length cannot be greater than 10000")
          .optional()
      ),
  })
  .refine(
    (data) =>
      data.radiatorLengthTo
        ? data.radiatorLengthFrom <= data.radiatorLengthTo
        : true,
    {
      message: `Value of "Radiator length to" field cannot be smaller than "Radiator length from" field value`,
      path: ["radiatorLengthFrom"],
    }
  );
