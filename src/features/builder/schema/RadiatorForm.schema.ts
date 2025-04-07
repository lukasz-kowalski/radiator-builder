import { z } from "zod";

export const radiatorFormSchema = z
  .object({
    radiatorFamily: z.string().optional(),
    radiatorLengthFrom: z
      .union([z.string(), z.number()])
      .optional()
      .transform((val) => (typeof val === "string" ? Number(val) : val))
      .pipe(
        z
          .number()
          .min(0, "Length cannot be negative")
          .max(10000, "Length cannot be greater than 10000")
          .optional()
      ),
    radiatorLengthTo: z
      .string()
      .optional()
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
        ? (data.radiatorLengthFrom || 0) <= data.radiatorLengthTo
        : true,
    {
      message: `Value of "Radiator length to" field cannot be smaller than "Radiator length from" field value`,
      path: ["radiatorLengthFrom"],
    }
  );
