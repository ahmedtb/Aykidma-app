import React from 'react'
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native'
import ViewFormFields from './components/ViewFormFields'

export default function ViewServiceScreen(props) {
    const service = props.route.params.service
    const title = service.title
    const description = service.description
    const fields = service.fields
    const category_id = service.category_id
    const image = service.image

    return (
        <ScrollView>
            <Text>{title}</Text>
            <Text>{description}</Text>
            <ViewFormFields fields={fields} />
            <Text>{category_id}</Text>
            <Text>{image}</Text>

            <TouchableOpacity onPress={() => props.navigation.navigate('EditServiceScreen',{service:service})}>
                <Text style={{fontSize:20, padding:20}}>تعديل عرض الخدمة</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}