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

function searchCategories(id, categories) {
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id === id) {
            return categories[i];
        }
    }
}

function ViewServiceScreen(props) {
    const service = props.route.params.service
    const title = service.title
    const description = service.description
    const fields = service.fields
    const category_id = service.category_id
    const image = imageValueSetup(service.image)

    const isMountedRef = useIsMountedRef();
    const [category, setCategory] = React.useState(null)

    async function setupCategories() {
        if (props.state.categories.length == 0)
            try {
                const data = await getAvailableCategories()
                props.setCategories(data)
                if (isMountedRef.current)
                    setCategory(searchCategories(category_id, data))
            } catch (error) {
                InspectAPIError(error)
            }
        else {
            setCategory(searchCategories(category_id, props.state.categories))
        }
    }
    React.useEffect(() => {
        setupCategories()
    }, [])

    return (
        <ScrollView>
            <StatusBar backButton={true} />
            <View style={{ backgroundColor: 'grey', flexDirection: 'row' }}>
                <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }}>العنوان </Text>
                <Text style={{flex: 2, fontSize: 20, fontWeight: 'bold', marginBottom: 10, textAlign: 'center',  }} >
                    {title}
                </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }}>صورة الخدمة </Text>
                <Image source={{ uri: image }} style={{ flex: 2, width: 200, height: 200, borderRadius: 15 }} />
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }}>وصف وتوضيح الخدمة </Text>
                <Text style={{ flex:2, borderWidth: 1,  borderRadius: 10}}>
                    {description}
                </Text>
            </View>

            <View style={{ flexDirection: 'row'}}>
                <Text style={{flex:1, fontSize: 25, textAlignVertical: 'center' }}>التصنيف: </Text>
                <View style={{flex:2}}>
                    <Image source={{ uri: 'data:image/png;base64,' + category?.image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                    <Text style={{ textAlign: 'center' }}>{category?.name}</Text>
                </View>
            </View>

            <View style={{ padding: 25, backgroundColor: '#e3e6e3', borderRadius: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>حقول الخدمة</Text>
                <ViewFormFields fields={fields} />
            </View>

            <TouchableOpacity style={{backgroundColor:'red', margin:10, borderRadius:10}} onPress={() => props.navigation.navigate('EditServiceScreen', { service: service })}>
                <Text style={{ fontSize: 20, padding: 20, color:'white' }}>تعديل العرض</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refreshNotifications, setCategories } from '../StateActions';
const mapStateToProps = (state1) => {
    const { state } = state1
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        refreshNotifications, setCategories
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ViewServiceScreen);