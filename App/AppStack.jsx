import React, { useContext } from 'react';
import TabStack from '../TabStack';

import { AppStateContext } from '../StateManagment/AppState'

import ServiceProviderTabStack from '../ServiceProviderTabStack'

export const StacksEnum = {
    TabStack: 1,
    ServiceProviderTabStack: 2
}

export default function AppStack() {
    const { stack } = useContext(AppStateContext)
    console.log(stack)
    if (stack == StacksEnum.ServiceProviderTabStack )
        return (
            <ServiceProviderTabStack />
        )
    else
        return (
            <TabStack />
        )
}
