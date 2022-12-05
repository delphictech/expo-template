import * as yup from 'yup';

/**
 * File defines varies yup schemas to be used for form validation
 */

export const authenticateSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});
export interface AuthenticateSchemaType extends yup.InferType<typeof authenticateSchema> {}

/**
 * schema for a one form input for email
 */
export const emailSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});
export interface EmailSchemaType extends yup.InferType<typeof emailSchema> {}

/**
 * Password and confirm password schema
 */
export const signupSchema = yup.object().shape({
    password: yup.string().required('Password is required').min(8, 'Minimum 8 characters'),
    confirmPassword: yup.string().test({
        name: 'confirmPassword',
        message: 'Passwords must match',
        test() {
            const { password, confirmPassword } = this.parent;
            if (password && confirmPassword !== password) {
                return false;
            }
            return true;
        },
    }),
});
export interface SignupSchemaType extends yup.InferType<typeof signupSchema> {}

/**
 * Password schema
 */
export const loginSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
});
export interface LoginSchemaType extends yup.InferType<typeof loginSchema> {}

// New schema for editing profile
export const editProfileSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
});
export interface EditProfileSchemaType extends yup.InferType<typeof editProfileSchema> {}

// Editing Password Schema
export const newPasswordSchema = yup.object().shape({
    password: yup.string().required('Password is required').min(8, 'Minimum 8 characters'),
    newPassword: yup.string().required('Password is required').min(8, 'Minimum 8 characters'),
    confirmPassword: yup.string().test({
        name: 'confirmPassword',
        message: 'Passwords must match',
        test() {
            const { newPassword, confirmPassword } = this.parent;
            if (newPassword && confirmPassword !== newPassword) {
                return false;
            }
            return true;
        },
    }),
});
export interface NewPasswordSchemaType extends yup.InferType<typeof newPasswordSchema> {}

export const newEmailSchema = yup.object().shape({
    oldEmail: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    newEmail: yup.string().email('Invalid email').required('New email is required'),
});
export interface NewEmailSchemaType extends yup.InferType<typeof newEmailSchema> {}
