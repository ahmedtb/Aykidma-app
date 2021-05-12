import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// const categories = [
//     'category1', 'category2', 'category3'
// ]

import { getAvailableCategories } from '../../../utilityFunctions/apiCalls'
import { AuthContext } from '../../../StateManagment/AuthState'
export default function CategoryComponent(props) {
    const selectCategory = props.selectCategory
    const [SelectedCategory, setSelectedCategory] = useState();
    const [categories, setCategories] = useState([])

    const { providerAuth } = React.useContext(AuthContext)
    useEffect( () => {
        getAvailableCategories(providerAuth).then( (data) => {
            console.log(data)
            setCategories(data)
        })
    },[])

    return (


        <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{}}>اختر تصنيفا لعرض الخدمة</Text>

                <Picker
                    style={{ flex: 1 }}
                    selectedValue={SelectedCategory}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedCategory(itemValue)
                        selectCategory(itemValue)
                    }
                    }>
                    <Picker.Item label={'حدد نوع الخدمة من فضلك'} value={null} />
                    {
                        categories.map((category, index) => {
                            return <Picker.Item key={index} label={category.name} value={category.id} />
                        })
                    }
                </Picker>
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
    enrollField: {
        borderWidth: 1, borderColor: 'grey', borderRadius: 5, padding: 10, fontSize: 20
    },

    fieldLable: {
        fontSize: 20,
    },

})