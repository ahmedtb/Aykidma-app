import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
export default function RefreshScrollView(props) {
    const refreshFunction = props.refreshFunction
    const style = props.style

    // refresh controller lines
    const wait = async (timeout) => {
        await refreshFunction();
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(10).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView style={style} refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
            {props.children}
        </ScrollView>
    )
}