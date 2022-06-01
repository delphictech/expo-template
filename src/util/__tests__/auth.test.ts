import { Alert } from 'react-native';
import { renderHook, act } from '@testing-library/react-hooks';

import { useLogin } from '../auth';

describe('useLogin', () => {
  it('returns errors if no values provided at submit', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.submit();
    });

    expect(result.current.errors).toEqual({
      email: 'This field is required.',
      password: 'This field is required.',
    });

    expect(alertSpy).not.toBeCalled();
  });

  it('calls alert with valid input', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password');
    });

    act(() => {
      result.current.submit();
    });

    expect(alertSpy).toBeCalled();
  });
});
