import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react/cjs/react.development';

function ToggleDetailsComments(props) {
    switch (props.tab) {
        case 1: return (
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <Image source={require('../../resources/profile.png')} style={{ width: 50, height: 50 }} />
                <View style={{ margin: 10, flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 2 }}>محمد عمر بن عبد الله</Text>
                        <Text style={{ flex: 1 }}>زبون</Text>
                        <Text style={{ flex: 1 }}>2021/3/3</Text>
                    </View>
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                    </View>
                    <Text style={{ color: 'black' }}>بصراحة انا مشوفتش صنانعي كده شاطر وبيصلح اي عيب لوحده مش نحتاج تقف علي ايده وتعب معايا والله وخد فولس مناسبه جدا جدا ليا تسلم ايدك ياهندسهخ</Text>
                </View>
            </View>
        )
        case 2: return (
            <ScrollView style={{}}>
                <Image source={require('../../resources/cleanHouse.jpg')} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold' }}>نظافة منزلية كاملة</Text>

                <View style={{ padding: 20 }}>
                    <Text >
                        جديد من تاسكتي، خدمة لنظافة المنزلية الكاملة، والتي ينفذها مجموعة:{"\n"}
العرض يشمل:{"\n"}
* تنظيف 7 وحدات (3 غرف + ){"\n"}
* الحمامات غسي الحمامات،{"\n"}

                    </Text>
                </View>

            </ScrollView>
        )
    }
}

export default function ServiceProviderScreen({ navigation }) {
    const [tab, setTab] = useState(1);

    return (
        <View style={{}}>


            <View style={{ flexDirection: 'row', margin: 20 }}>
                <Image source={require('../../resources/worker.jpg')} style={{ width: 50, height: 100 }} />
                <View style={{ margin: 10, flex: 1 }}>
                    <Text>محمد عمر بن عبد الله</Text>
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', backgroundColor: 'yellow' }}>
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <AntDesign name="staro" size={15} color="black" />
                        <Text>تقييم 33</Text>
                    </View>
                    <Text style={{ color: 'red' }}>صيانة تشطيب ترتيب</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: '20%' }}>
                <Text>كهربائي</Text>
                <Text>تأسيس</Text>
                <Text>تشطيب</Text>
                <Text>صيانة</Text>
            </View>

            <View style={{ marginTop: 20, borderTopColor: 'grey', borderTopWidth: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => setTab(1)}>
                        <Text style={{ fontSize: 20, padding: 20 }}>التعليقات</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTab(2)}>
                        <Text style={{ fontSize: 20, padding: 20 }}>تفاصيل</Text>
                    </TouchableOpacity>
                </View>

                <ToggleDetailsComments tab={tab} />

            </View>




        </View>

    );
}




const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});
