import React from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity
} from 'react-native'
import ViewFormFields from './components/ViewFormFields'
import StatusBar from '../components/StatusBar'
import { getAvailableCategories } from '../../utilityFunctions/apiCalls'
import useIsMountedRef from '../../utilityFunctions/useIsMountedRef'


function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
};

function imageValueSetup(value) {
    if (value) {
        if (isValidURL(value)) {
            return value
        } else
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

    const isMountedRef = useIsMountedRef();
    const [categories, setCategories] = React.useState([])
    async function setupCategories() {
        try {
            const data = await getAvailableCategories()
            if (isMountedRef.current)
                setCategories(data)
            console.log(data)
        } catch (error) {
            InspectAPIError(error)
        }
    }
    React.useEffect(() => {
        setupCategories()
    }, [])

    return (
        <ScrollView>
            <StatusBar backButton={true} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }} >
                {title}
            </Text>
            <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius: 15 }} />
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