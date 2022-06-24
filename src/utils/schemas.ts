import * as yup from 'yup';

// define email scheme
export const emailSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

// define signupSchema
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

// define login schema
export const loginSchema = yup.object().shape({
    password: yup.string().required('Password is required'),
});