import React, { useContext } from 'react';
import TabStack from '../TabStack';

// import { AppStateContext } from '../StateManagment/AppState'

import ServiceProviderTabStack from '../ServiceProviderTabStack'
import { useState } from 'react';

export const StacksEnum = {
    TabStack: 1,
    ServiceProviderTabStack: 2
}

export default function AppStack() {
    
    const [stack, setStack] = useState(StacksEnum.ServiceProviderTabStack)
    if (stack == StacksEnum.ServiceProviderTabStack )
        return (
            <ServiceProviderTabStack />
        )
    else
        return (
            <TabStack />
        )
}
