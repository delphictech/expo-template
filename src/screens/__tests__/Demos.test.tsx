import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { mocked } from 'ts-jest/utils';

import { TextDemo, ButtonDemo, FormDemo } from '../Demos';
import { useLogin } from '../../util/auth';

jest.mock('../../util/auth');

describe('TextDemo', () => {
  it('renders the text', () => {
    const out = render(<TextDemo />);

    out.getByText('This is a header');
  });
});

describe('FormDemo', () => {
  it('renders the fields and captures input', () => {
    const submit = jest.fn();
    const setEmail = jest.fn();
    const setPassword = jest.fn();
    mocked(useLogin).mockReturnValueOnce({
      errors: {},
      submit,
      setEmail,
      setPassword,
      email: '123',
      password: '123',
    });

    const out = render(<FormDemo />);

    fireEvent.changeText(
      out.getByPlaceholderText('Enter your email...'),
      'test@example.com',
    );
    expect(setEmail).toBeCalledWith('test@example.com');

    fireEvent.changeText(
      out.getByPlaceholderText('Enter your password...'),
      'password',
    );
    expect(setPassword).toBeCalledWith('password');

    fireEvent.press(out.getByText('Sign In'));

    expect(submit).toBeCalled();
  });

  it('renders error message', () => {
    mocked(useLogin).mockReturnValueOnce({
      errors: { email: 'this is an error' },
      submit: jest.fn(),
      setEmail: jest.fn(),
      setPassword: jest.fn(),
      email: '123',
      password: '123',
    });
    const out = render(<FormDemo />);

    out.getByText('this is an error');
  });
});

describe('ButtonDemo', () => {
  it('renders tappable buttons', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const out = render(<ButtonDemo />);

    fireEvent.press(out.getByText('Default Button'));
    expect(alertSpy).toBeCalled();
  });
});
