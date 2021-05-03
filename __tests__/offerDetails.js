import 'react-native';
import React from 'react';
import App from '../App';

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000';


// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

import { Button, Text, TextInput, View } from 'react-native'
import { fireEvent, render, waitFor, act } from '@testing-library/react-native'

// jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@expo/vector-icons')
jest.mock('react-native-render-html')

it('renders correctly', async () => {
    const inst = render(<App />);
    const offers = inst.getByText('كل العروض')
    fireEvent.press(offers) 

    const offer = await inst.findByText('خدمات طلاء')
    fireEvent.press(offer) 

    // await act(async () => await inst.findByText('املأ نموذج طلبك الان') ); 
    // const openForm = await inst.findByText('املأ نموذج طلبك الان')

    await act( async () => mount(<App />));

    await inst.findByText('املأ نموذج طلبك الان')
    
    // inst.debug()

});
