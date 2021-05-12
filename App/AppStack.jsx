import React, { useContext } from 'react';

import ServiceProviderTabStack from '../ServiceProviderTabStack'
import TabStack from '../TabStack';

export const StacksEnum = {
    TabStack: 1,
    ServiceProviderTabStack: 2
}

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const ParenStack = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen name="ServiceProviderTabStack" component={ServiceProviderTabStack}
                options={{ title: 'مزود خدمات' }}
            />

            <Stack.Screen name="TabStack" component={TabStack}
                options={{ title: 'المستخدم' }}
            />

        </Stack.Navigator>
    );
}

export default function AppStack() {

    // const [stack, setStack] = React.useState(StacksEnum.ServiceProviderTabStack)
    // if (stack == StacksEnum.ServiceProviderTabStack )
    //     return (
    //         <ServiceProviderTabStack />
    //     )
    // else
    //     return (
    //         <TabStack />
    //     )
    return (
        <ParenStack />
    )
}
