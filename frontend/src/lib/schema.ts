import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(1, {
      message: "Full name is required.",
    }),
    username: z.string().min(1, {
      message: "Username is required.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm your password.",
    }),
    gender: z.enum(["male", "female"], {
      message: "Please select a gender.",
    }),
  })
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword;
    },
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

export const loginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const sendMessageSchema = z.object({
  message: z.string(),
});

export type signupSchemaType = z.infer<typeof signupSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>;
export type sendMessageSchemaType = z.infer<typeof sendMessageSchema>;
