/**
 * @format
 */


import 'react-native';
import React from 'react';
import TabStack from '../TabStack'
import { NavigationContainer } from '@react-navigation/native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


import OffersScreen from '../TabStack/OffersTab/OffersScreen';

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000';

// jest.useFakeTimers()
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
// jest.runAllTimers()
// jest.setTimeout(30000);


it('renders tabs correctly', async () => {

    const screen = render(
        <OffersScreen />, { wrapper: NavigationContainer }
    );
    // jest.runAllTimers();

    await waitFor(() => screen.getByText('خدمات طلاء'));

    // screen.debug();
});
