import React from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native'
import FieldsEditorComponent from './components/FieldsEditorComponent'
import ImagePickerComponent from './components/ImagePickerComponent'
import CategoryComponent from './components/CategoryComponent'
import {editService} from '../../utilityFunctions/apiCalls'

export default function EditServiceScreen(props) {

    const service = props.route.params.service
    const [title, setTitle] = React.useState(service.title)
    const [description, setDescription] = React.useState(service.description)
    // const [editedFields, setEditedFields] = React.useState(service.fields)
    let editedFields = [...service.fields]
    const [category_id, selectCategory] = React.useState(service.category_id)
    const [image, setImage] = React.useState(service.image)

    function onChange(data) {
        editedFields = (data)
        console.log(editedFields)
    }

    function submit(){
        editService(service.id,title, description, editedFields, category_id, image, service.meta_data)
        .then(data=>console.log(data))
        .catch(error=>console.log(error))
    }

    return (
        <View>
            <ScrollView>

                {/* <View style={{ margin: 10 }}>
                    <Text >عنوان الخدمة</Text>
                    <TextInput
                        onChangeText={setTitle}
                        value={title}
                    />
                </View> */}

                <View style={{  }}>
                    <FieldsEditorComponent fields={editedFields} onChange={onChange} />
                </View>

                {/* <View>
                    <ImagePickerComponent
                        onChange={
                            (imageBase64) => { setImage(imageBase64) }
                        }
                        value={image}
                        style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
                    />

                    <Text>وصف الخدمة</Text>

                    <TextInput
                        multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                        onChangeText={(text) => { setDescription(text) }}
                        value={description}
                    />
                    <CategoryComponent selectCategory={selectCategory} category_id={category_id} />

                </View> */}

                <TouchableOpacity
                    onPress={() => submit()}
                    style={{ backgroundColor: 'red', flexDirection: 'row', width: '50%', alignSelf: 'center', height: 50, alignItems: 'center', borderRadius: 19 }}>
                    <Text style={{ textAlign: 'center', color: 'white', flex: 1, fontSize: 20 }}>طلب عديل الخدمة</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}