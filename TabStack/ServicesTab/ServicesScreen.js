import React from 'react';
import {
    View, StyleSheet
} from 'react-native';

import SearchComponent from './components/SearchComponent'
import ServicesListComponent from './components/ServicesListComponent'
import StatusBar from '../components/StatusBar'


export default function ServicesScreen({ navigation }) {
    const [focus, setFocus] = React.useState('list')

    function focusOnSearch() {
        setFocus('search')
    }
    function focusOnList() {
        setFocus('list')
    }


    return (
        <View style={styles.container}>
            <StatusBar title="كل العروض" />

            <SearchComponent
                focus={focus == 'search'}
                focusHere={focusOnSearch}
                unFocusFromHere={focusOnList}
            />
            <ServicesListComponent
                focus={focus == 'list'}
                focusHere={focusOnList}
                unFocusFromHere={focusOnSearch}
            />

        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight,
        paddingBottom: 10,
    },

})

