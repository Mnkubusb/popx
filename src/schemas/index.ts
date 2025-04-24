import * as z from "zod"

export const LoginScheme = z.object({
    Email_Address: z.string().email(),
    Password: z.string().min(6),
});

export const RegisterScheme = z.object({
    Full_Name: z.string(),
    Phone_No: z.string().min(10),
    Email_Address: z.string().email(),
    Password: z.string().min(6),
    Company_Name: z.string().optional(),
    isAgency: z.enum(["Yes", "No"]),
});