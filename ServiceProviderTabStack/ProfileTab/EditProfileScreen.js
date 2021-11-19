import React from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import ImagePicker from './components/ImagePicker'
import NavigationBar from '../../components/NavigationBar'
import { editProviderProfile } from '../../utilityFunctions/apiCalls'
import { logError, fetchProvider } from '../../redux/AuthFunctions'

function EditProfileScreen(props) {
    const imageRoute = props.route.params.image
    const [name, setName] = React.useState(props.state.provider?.name)
    // const [phoneNumber, setPhoneNumber] = React.useState(props.state.provider?.phone_number)
    const [image, setimage] = React.useState(imageRoute)
    const [response, setresponse] = React.useState()
    const submit = () => {
        editProviderProfile(name, image)
            .then(response => {
                fetchProvider()
                console.log('edit provider', response.data)
                setresponse(response)
                props.navigation.goBack()
            })
            .catch(error => {
                logError(error, 'EditProfileScreen')
                if (error.response?.errors) setresponse(error.response)
            })
    }
    return (
        <ScrollView>
            <NavigationBar name={name} />

            <View style={{ padding: 15 }}>
                <Text>الصورة الشخصية</Text>
                <ImagePicker
                    onChange={
                        (value) => {
                            setimage(value)
                        }
                    }
                    value={image}
                    style={{ marginVertical: 5, borderWidth: 0.4, borderRadius: 10, paddingVertical: 10 }}
                />

                <Text>الاسم</Text>

                <TextInput
                    multiline={true}
                    style={{ borderWidth: 0.4, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10, marginVertical: 5, fontSize: 15 }}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                    value={name}
                />

                {/* <Text>رقم الهاتف</Text>

                <TextInput
                    multiline={true}
                    style={{ borderWidth: 0.4, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10, marginVertical: 5, fontSize: 15, textAlign: 'right' }}
                    onChangeText={(text) => {
                        setPhoneNumber(text)
                    }}
                    keyboardType='phone-pad'
                    value={phoneNumber}
                /> */}
            </View>

            <TouchableOpacity
                style={{ alignSelf: 'center', backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => submit()}
            >
                <Text style={{ color: 'white' }}>تعديل </Text>
            </TouchableOpacity>
            <ResponseMessageModal response={response} />
        </ScrollView>
    )
}


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser, setToken } from '../../redux/StateActions';
import ResponseMessageModal from '../../components/ResponseMessageModal';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setUser,
        setToken
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);