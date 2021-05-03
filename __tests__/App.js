import 'react-native';
import React from 'react';
import App from '../App';

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000';


// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

import { Button, Text, TextInput, View } from 'react-native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'

// jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@expo/vector-icons')

it('renders correctly', async () => {
  const inst = render(<App />);
  const offers = inst.getByText('كل العروض')
  fireEvent.press(offers)

  await waitFor(() => expect(inst.queryByText('خدمات طلاء')).toBeTruthy() )


});
