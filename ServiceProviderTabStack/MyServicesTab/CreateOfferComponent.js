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

import CreateNewFieldComponent from './components/CreateNewFieldComponent'
import CreatedFieldsRender from './components/CreatedFieldsRender'
import ImagePickerComponent from './components/ImagePickerComponent'
import CategoryComponent from './components/CategoryComponent'
import { creatNewServiceWtihOffer } from '../../utilityFunctions/apiCalls'

export default function CreateOfferComponent(props)
{
    const title = props.title;

    const [newFieldCreateComponent, setNewFieldCreateComponent] = React.useState(false)


    // const [title, setTitle] = React.useState(null)
    const [description, setDescription] = React.useState(null)
    const [fields, setFields] = React.useState([])
    const [category_id, selectCategory] = React.useState(null)

    function addNewField(fieldConfig) {
        setFields(prevFields => (
            [...prevFields, fieldConfig]
        ));
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
                        (imageBase64) => {
                        }
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
                onPress={() => creatNewServiceWtihOffer(title, description, fields, category_id, [], 'null')}
                style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>طلب تسجيل الخدمة</Text>
            </TouchableOpacity>
        </View>
    )
}