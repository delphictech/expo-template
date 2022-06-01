import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { List } from '../List';

it('renders tappable items', () => {
  const push = jest.fn();
  // @ts-ignore
  // Ignoring next line because we don't need to pass all React Navigation related props down to the
  // screen for this test to work.
  const out = render(<List navigation={{ push }} />);

  fireEvent.press(out.getByText('Text'));
  expect(push).toBeCalledWith('TextDemo');

  fireEvent.press(out.getByText('Form'));
  expect(push).toBeCalledWith('FormDemo');

  fireEvent.press(out.getByText('Button'));
  expect(push).toBeCalledWith('ButtonDemo');
});
