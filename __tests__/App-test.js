/**
 * @format
 */


import 'react-native';
import React from 'react';
import App from '../App';
import TabStack from '../TabStack'
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent } from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.useFakeTimers()

describe('rendering App', () => {

  it('renders tabs correctly', async () => {
    // const { getByTestId, getByText, queryByTestId, toJSON } = 
    const screen = render(
      <App />
    );
    fireEvent.press(await screen.getByText('كل العروض'))
    // expect(await findByText(container, 'User Name Required')).toBeVisible()
    // const { findByText } = App;
    // const header = await findByText('غسيل سيارات');
    // screen.getByText('صيانة وتنظيف وتجديد أفران الغاز والكهربائية')
  });

}
)