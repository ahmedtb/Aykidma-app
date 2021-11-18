import React from 'react'
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import ArrayOfFieldsRender from '../../FieldsTypes/ArrayOfFieldsRender'
import StatusBar from '../components/StatusBar'
import { getAvailableCategories } from '../../utilityFunctions/apiCalls'
import {logError} from '../../redux/AuthFunctions'
import useIsMountedRef from '../../components/useIsMountedRef'
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
    const array_of_fields = service.array_of_fields
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
                logError(error,'ViewServiceScreen setupCategories')
            }
        else {
            setCategory(searchCategories(category_id, props.state.categories))
        }
    }
    React.useEffect(() => {
        setupCategories()
    }, [])

    return (
        <View>

            <ScrollView>
                <StatusBar backButton={true} />

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <MaterialIcons name="title" size={30} color="black" />
                        <Text style={style.cardTitleText}>العنوان </Text>
                    </View>
                    <Text style={{ ...style.cardContent, fontSize: 20, textAlign: 'center' }}  >
                        {title}
                    </Text>
                </View>

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <AntDesign name="picture" size={30} color="black" />

                        <Text style={style.cardTitleText}>صورة الخدمة </Text>
                    </View>
                    <Image source={{ uri: image }} style={{ ...style.cardContent, height: 120, width: 120, borderRadius: 15 }} />

                </View>

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <MaterialCommunityIcons name="subtitles-outline" size={30} color="black" />

                        <Text style={style.cardTitleText}>وصف وتوضيح الخدمة </Text>
                    </View>
                    <Text style={{ ...style.cardContent, fontSize: 20, textAlign: 'center' }} >
                        {description}
                    </Text>
                </View>

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <MaterialIcons name="category" size={30} color="black" />

                        <Text style={style.cardTitleText}>التصنيف: </Text>
                    </View>
                    <View style={{ ...style.cardContent }} >
                        <Image source={{ uri: 'data:image/png;base64,' + category?.image }} style={{ width: 100, height: 100, borderRadius: 15 }} />
                        <Text style={{ textAlign: 'center' }}>{category?.name}</Text>
                    </View>
                </View>

                <View style={style.card}>
                    <View style={style.cardTitle}>
                        <AntDesign name="form" size={24} color="black" />
                        <Text style={style.cardTitleText}>حقول نموذج الطلب</Text>
                    </View>

                    <ArrayOfFieldsRender array_of_fields={array_of_fields} />
                </View>

                <TouchableOpacity style={{ backgroundColor: 'red', margin: 10, borderRadius: 10 }} onPress={() => props.navigation.navigate('EditServiceScreen', { service: service })}>
                    <Text style={{ fontSize: 20, padding: 20, color: 'white' }}>تعديل العرض</Text>
                </TouchableOpacity>
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

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken, setCategories } from '../../redux/StateActions';
const mapStateToProps = ({state}) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken,
        setCategories
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ViewServiceScreen);