import { z } from 'zod';

export const zSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password must be at most 64 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)'),
    
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),

      otp: z.string().regex(/^\d{6}$/, {
           message: 'OTP must be a 6-digit number',
      }), 

      _id:z.string().min(3,"id is required."),
      alt:z.string().min(3,"alt is required."),
      title:z.string().min(3,"Title is required."),
      slug:z.string().min(3,"Slug is required."),
}); 


