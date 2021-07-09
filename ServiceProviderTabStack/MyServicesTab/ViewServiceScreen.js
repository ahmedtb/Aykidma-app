import React from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import ViewFormFields from './components/ViewFormFields'
import StatusBar from '../components/StatusBar'
import { getAvailableCategories } from '../../utilityFunctions/apiCalls'
import useIsMountedRef from '../../utilityFunctions/useIsMountedRef'
import { MaterialIcons, AntDesign, MaterialCommunityIcons, } from '@expo/vector-icons';

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

            <View style={style.card}>
                <View style={{flexDirection: 'row', }}>
                    <MaterialIcons name="title" size={30} color="black" />
                    <Text style={style.cardTitle}>العنوان </Text>
                </View>
                <Text style={{ ...style.cardContent, fontSize: 20, textAlign: 'center' }}  >
                    {title}
                </Text>
            </View>

            <View style={style.card}>
                <AntDesign name="picture" size={30} color="black" />
                <View style={{ flex: 1 }}>

                    <Text style={style.cardTitle}>صورة الخدمة </Text>
                    <Image source={{ uri: image }} style={{ ...style.cardContent, height: 120, width: 120, borderRadius: 15 }} />
                </View>

            </View>

            <View style={style.card}>
                <MaterialCommunityIcons name="subtitles-outline" size={30} color="black" />
                <View style={{}}>

                    <Text style={style.cardTitle}>وصف وتوضيح الخدمة </Text>
                    <Text style={{ ...style.cardContent, fontSize: 20, textAlign: 'center' }} >
                        {description}
                    </Text>
                </View>
            </View>

            <View style={style.card}>
                <MaterialIcons name="category" size={30} color="black" />
                <View style={{}}>

                    <Text style={style.cardTitle}>التصنيف: </Text>
                    <View style={{ ...style.cardContent }} >
                        <Image source={{ uri: 'data:image/png;base64,' + category?.image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                        <Text style={{ textAlign: 'center' }}>{category?.name}</Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 25, backgroundColor: '#e3e6e3', borderRadius: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>حقول الخدمة</Text>
                <ViewFormFields fields={fields} />
            </View>

            <TouchableOpacity style={{ backgroundColor: 'red', margin: 10, borderRadius: 10 }} onPress={() => props.navigation.navigate('EditServiceScreen', { service: service })}>
                <Text style={{ fontSize: 20, padding: 20, color: 'white' }}>تعديل العرض</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    card: { margin: 10, borderWidth: 1, borderColor: '#d1c5c5', borderRadius: 15, },
    cardIcon: {

    },
    cardTitle: {
        fontSize: 20,
        textAlignVertical:'center'
    },
    cardContent: {
        marginBottom: 10, alignSelf: 'center'
    }
})

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