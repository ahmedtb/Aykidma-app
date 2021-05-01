import 'react-native';
import React from 'react';
import App from '../App';



// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@expo/vector-icons')

it('renders correctly', () => {
  renderer.create(<App />);
});
