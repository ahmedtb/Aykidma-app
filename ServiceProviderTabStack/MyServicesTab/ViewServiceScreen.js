import React from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import ViewFormFields from './components/ViewFormFields'


function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

function imageValueSetup(value) {
    if (value) {
        if (isValidURL(value)){
            return value
        }else
            return 'data:image/png;base64,' + value
    } else
        return null
}


export default function ViewServiceScreen(props) {
    const service = props.route.params.service
    const title = service.title
    const description = service.description
    const fields = service.fields
    const category_id = service.category_id
    const image = imageValueSetup(service.image)

    return (
        <ScrollView>
            <Text style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderRadius: 7 }} >
                {title}
            </Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1 }} >

                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />

            </View>
            <Text style={{ borderWidth: 1, margin: 10, borderRadius: 10, marginVertical: 5 }}>
                {description}
            </Text>
            <Text>{category_id}</Text>
            <ViewFormFields fields={fields} />

            

            <TouchableOpacity onPress={() => props.navigation.navigate('EditServiceScreen', { service: service })}>
                <Text style={{ fontSize: 20, padding: 20 }}>تعديل عرض الخدمة</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}