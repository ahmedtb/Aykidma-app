import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { MaterialIcons, AntDesign, MaterialCommunityIcons, } from '@expo/vector-icons';

import { AuthContext } from '../../StateManagment/AuthState'

import FieldsEditorComponent from './components/FieldsEditorComponent'
import CreateNewFieldComponent from './components/CreateNewFieldComponent'

import ImagePickerComponent from './components/ImagePickerComponent'
import CategoryComponent from './components/CategoryComponent'
import StatusBar from '../components/StatusBar'
import { editService } from '../../utilityFunctions/apiCalls'

export default function EditServiceScreen(props) {
    const { InspectAPIError } = React.useContext(AuthContext)

    const service = props.route.params.service
    const [title, setTitle] = React.useState(service.title)
    const [description, setDescription] = React.useState(service.description)
    let editedFields = [...service.fields]
    const [category_id, selectCategory] = React.useState(service.category_id)
    const [image, setImage] = React.useState(service.image)

    function onChange(data) {
        editedFields = (data)
    }
    function addNewField(fieldConfig) {
        editedFields = [...editedFields, fieldConfig]
    }

    function submit() {
        editService(service.id, title, description, editedFields, category_id, image, service.meta_data)
            .then(data => console.log(data))
            .catch(error => InspectAPIError(error))
    }

    return (
        <View>
            <ScrollView>
                <StatusBar backButton={true} title={'تعديل خدمة'} />

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <MaterialIcons name="title" size={30} color="black" />
                        <Text style={style.cardTitleText}>عنوان الخدمة</Text>
                    </View>
                    <TextInput
                        style={{ ...style.cardContent, fontSize: 20, textAlign: 'center', borderWidth: 1, borderRadius: 4 }}
                        onChangeText={setTitle}
                        value={title}
                    />
                </View>
                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <AntDesign name="picture" size={30} color="black" />

                        <Text style={style.cardTitleText}>صورة الخدمة</Text>

                    </View>
                    <ImagePickerComponent
                        onChange={
                            (imageBase64) => { setImage(imageBase64) }
                        }
                        value={image}
                        style={{ marginVertical: 5, borderRadius: 10, padding: 10 }}
                    />
                </View>

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <MaterialCommunityIcons name="subtitles-outline" size={30} color="black" />

                        <Text style={style.cardTitleText}>الوصف</Text>

                    </View>

                    <TextInput
                        multiline={true} numberOfLines={4}
                        style={{ ...style.cardContent, borderWidth: 1, margin: 10, borderRadius: 10, marginVertical: 5 }}
                        onChangeText={(text) => { setDescription(text) }}
                        value={description}
                    />
                </View>

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <MaterialIcons name="category" size={30} color="black" />
                        <Text style={style.cardTitleText}>التصنيف</Text>
                    </View>

                    <CategoryComponent selectCategory={selectCategory} category_id={category_id} />

                </View>



                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <AntDesign name="form" size={24} color="black" />
                        <Text style={style.cardTitleText}>نموذج الخدمة </Text>
                    </View>
                    <FieldsEditorComponent fields={editedFields} onChange={onChange} />
                </View>

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <AntDesign name="form" size={24} color="black" />
                        <Text style={{ ...style.cardTitleText }}>اضافة حقول جديدة</Text>
                    </View>
                    <CreateNewFieldComponent addNewField={addNewField} />
                </View>

                <TouchableOpacity onPress={() => submit()} style={{ backgroundColor: 'red', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>طلب تعديل الخدمة</Text>
                </TouchableOpacity>

                <View style={{ padding: 50 }}></View>

            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    card: { margin: 10, padding: 5, borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 15, },
    cardIcon: {

    },
    cardTitle: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#d1c5c5', paddingVertical: 5, marginBottom: 10 },
    cardTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5,
        textAlignVertical: 'center'
    },
    cardContent: {
        marginBottom: 10, alignSelf: 'center'
    }
})