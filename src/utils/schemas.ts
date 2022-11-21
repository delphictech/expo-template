import * as yup from 'yup';

/**
 * File defines varies yup schemas to be used for form validation
 */

/**
 * schema for a one form input for email
 */
export const emailSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

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

/**
 * Password schema
 */
export const loginSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
});

// New schema for editing profile
export const editProfileSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Minimum 8 characters'),
});
