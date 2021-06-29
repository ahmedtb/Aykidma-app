import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native'
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
            <StatusBar />
            <ScrollView>

                <View style={{ margin: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>عنوان الخدمة</Text>
                    <TextInput
                        style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderRadius: 7 }}
                        onChangeText={setTitle}
                        value={title}
                    />
                </View>

                <View style={{}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>حقول الخدمة </Text>
                    <FieldsEditorComponent fields={editedFields} onChange={onChange} />
                </View>

                <View>
                    <CreateNewFieldComponent addNewField={addNewField} />
                </View>

                <View>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>شرح لعرض الخدمة</Text>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>صورة الخدمة</Text>
                    <ImagePickerComponent
                        onChange={
                            (imageBase64) => { setImage(imageBase64) }
                        }
                        value={image}
                        style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
                    />

                    <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>الوصف</Text>

                    <TextInput
                        multiline={true} numberOfLines={4} style={{ borderWidth: 1, margin: 10, borderRadius: 10, marginVertical: 5 }}
                        onChangeText={(text) => { setDescription(text) }}
                        value={description}
                    />
                    <CategoryComponent selectCategory={selectCategory} category_id={category_id} />

                </View>

                <TouchableOpacity onPress={() => submit()} style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                    <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>طلب تعديل الخدمة</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}