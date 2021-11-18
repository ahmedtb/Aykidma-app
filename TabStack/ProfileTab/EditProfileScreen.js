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
import { editUserProfile } from '../../utilityFunctions/apiCalls'
import { fetchUser, logError } from '../../redux/AuthFunctions'
function EditProfileScreen(props) {
    const imageRoute = props.route.params.image
    const [name, setName] = React.useState(props.state.user.name)
    const [phoneNumber, setPhoneNumber] = React.useState(props.state.user.phone_number)
    const [image, setimage] = React.useState(imageRoute)

    const submit = () => {
        editUserProfile(name, phoneNumber, image)
            .then(data => fetchUser())
            .catch(error => logError(error, 'EditProfileScreen'))
    }
    return (
        <View>
            <NavigationBar name={props.state.user.name} />


            <TextInput
                multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                onChangeText={(text) => {
                    setName(text)
                }}
                value={name}
            />

            <TextInput
                multiline={true} numberOfLines={4} style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                onChangeText={(text) => {
                    setPhoneNumber(text)
                }}
                keyboardType='phone-pad'
                value={phoneNumber}
            />
            <ImagePicker
                onChange={
                    (value) => {
                        setimage(value)
                    }
                }
                value={image}
                style={{ marginVertical: 5, borderRadius: 10, padding: 50 }}
            />

            <TouchableOpacity
                style={{ alignSelf: 'center', backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => submit()}
            >
                <Text style={{ color: 'white' }}>تعديل </Text>
            </TouchableOpacity>
        </View>
    )
}


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const mapStateToProps = ({ state }) => {
    return { state }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);