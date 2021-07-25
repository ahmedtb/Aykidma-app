import React from 'react';
import {
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import ImagePicker from './components/ImagePicker'
import { AuthContext } from '../../StateManagment/AuthState'
import NavigationBar from '../components/NavigationBar'
import { editProviderProfile } from '../../utilityFunctions/apiCalls'

export default function EditProfileScreen(props) {
    const { providerAuth, RefreshProviderData, InspectAPIError } = React.useContext(AuthContext)
    const imageRoute = props.route.params.image
    const [name, setName] = React.useState(providerAuth.provider.name)
    const [phoneNumber, setPhoneNumber] = React.useState(providerAuth.provider.phone_number)
    const [image, setimage] = React.useState(imageRoute)

    const submit = () => {
        editProviderProfile(name, phoneNumber, image)
            .then(data => {
                RefreshProviderData()
                // console.log('edit provider', data)
                props.navigation.goBack()
            })
            .catch(error => InspectAPIError(error))
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

                <Text>رقم الهاتف</Text>

                <TextInput
                    multiline={true}
                    style={{ borderWidth: 0.4, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 10, marginVertical: 5, fontSize: 15, textAlign: 'right' }}
                    onChangeText={(text) => {
                        setPhoneNumber(text)
                    }}
                    keyboardType='phone-pad'
                    value={phoneNumber}
                />
            </View>

            <TouchableOpacity
                style={{ alignSelf: 'center', backgroundColor: 'red', height: 50, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={() => submit()}
            >
                <Text style={{ color: 'white' }}>تعديل </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}