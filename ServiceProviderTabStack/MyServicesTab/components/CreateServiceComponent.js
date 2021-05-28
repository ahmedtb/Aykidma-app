import React from 'react'
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
} from 'react-native'
import {AuthContext} from '../../../StateManagment/AuthState'

import CreateNewFieldComponent from './CreateNewFieldComponent'
import CreatedFieldsRender from './CreatedFieldsRender'
import ImagePickerComponent from './ImagePickerComponent'
import CategoryComponent from './CategoryComponent'
import { createService } from '../../../utilityFunctions/apiCalls'

export default function CreateOfferComponent(props) {
    const {InspectAPIError} = React.useContext(AuthContext)
    const title = props.title;
    const [description, setDescription] = React.useState(null)
    const [fields, setFields] = React.useState([])
    const [category_id, selectCategory] = React.useState(null)
    const [image, setImage] = React.useState(null)

    const [newFieldCreateComponent, setNewFieldCreateComponent] = React.useState(false)



    function addNewField(fieldConfig) {
        setFields(prevFields => (
            [...prevFields, fieldConfig]
        ));
    }

    function submit() {
        console.log(image.length)
        createService(title, description, fields, category_id, image, [])
        .then( data => {
            console.log(data)
        })
        .catch(error => {
            InspectAPIError(error)
        })
    }

    return (
        <View>
            <CreatedFieldsRender fields={fields} />

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
                        (imageBase64) => { setImage(imageBase64) }
                    }
                    value={null}
                    style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
                />
                <Text>توضيح عام لخدمتك (اختياري)</Text>
                <TextInput
                    multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                    onChangeText={(text) => { setDescription(text) }}
                    value={description}
                />

            </View>

            <CategoryComponent selectCategory={selectCategory} />


            <TouchableOpacity
                onPress={() => submit()}
                style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>طلب تسجيل الخدمة</Text>
            </TouchableOpacity>
        </View>
    )
}