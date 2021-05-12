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
    Button,
    TouchableOpacity
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import ChoiceListFromOffersModal from './components/ChoiceListFromOffersModal'
import CreateNewFieldComponent from './components/CreateNewFieldComponent'
import CreatedFieldsRender from './components/CreatedFieldsRender'
import ImagePickerComponent from './components/ImagePickerComponent'
import CategoryComponent from './components/CategoryComponent'

import {AuthContext} from '../../StateManagment/AuthState'
import {creatNewServiceWtihOffer} from '../../utilityFunctions/apiCalls'



export default function AddNewService({ navigation }) {
    const { loginProvider, providerAuth } = React.useContext(AuthContext)

    const [ChoiceListVisibility, setChoiceListVisibility] = useState(false)
    const [newFieldCreateComponent, setNewFieldCreateComponent] = useState(false)


    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [fields, setFields] = useState([])
    const [category_id, selectCategory] = useState(null)
    console.log(category_id)

    function addNewField(fieldConfig) {
        setFields(prevFields => (
            [...prevFields, fieldConfig]
        ));
    }


    return (
        <ScrollView>

            <View style={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20 }}>

                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >عنوان الخدمة</Text>
                    <TextInput style={styles.enrollField}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={styles.fieldLable} >اختر تصميم عرض موجود بالفعل (موصى به)</Text>
                    <TouchableOpacity onPress={() => { setChoiceListVisibility(true) }}
                        style={{}}
                    >
                        <Text>اختر تصميما لعرض</Text>
                        <ChoiceListFromOffersModal visibility={[ChoiceListVisibility, setChoiceListVisibility]} />
                    </TouchableOpacity>
                </View>

                <CreatedFieldsRender fields={fields} />
                {/* {
                    fields.map((field, index) => {
                        return (
                            <View key={index} >

                            </View>
                        )
                    })
                } */}

                {
                    (newFieldCreateComponent) ? (
                        <View>
                            <CreateNewFieldComponent addNewField={addNewField} />
                        </View>
                    ) : (
                        <View>
                            <Text style={{ textAlign: 'center', fontSize: 20 }}>اضف الحقول العرض التي تراها مناسبة لخدمتك</Text>
                            <TouchableOpacity
                                onPress={() => setNewFieldCreateComponent(true)}
                                style={{ backgroundColor: 'grey', borderRadius: 6, padding: 15, marginHorizontal: '30%' }}
                            >
                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>أضف حقل</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

                <View>
                    <ImagePickerComponent
                        onChange={
                            (imageBase64) => {
                            }
                        }
                        value={null}
                        style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
                    />
                    <Text>توضيح عام لخدمتك (اختياري)</Text>
                    <TextInput
                        multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                        onChangeText={(text) => {setDescription(text)}}
                        value={description}
                    />

                </View>

                <CategoryComponent selectCategory={selectCategory}/>
                

                <TouchableOpacity
                    onPress={() => creatNewServiceWtihOffer(title, description, fields, category_id, [], 'null', providerAuth.token)}
                    style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                    <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>طلب تسجيل الخدمة</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>

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