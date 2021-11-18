import React from 'react'
import {
    TextInput,
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import ModalWrapper from '../../../../components/ModalWrapper'
import { Octicons, AntDesign } from '@expo/vector-icons'
import { submitReviewReport } from '../../../../utilityFunctions/apiCalls'
import { logError } from '../../../../redux/AuthFunctions'

export default function ReviewsComponent(props) {
    const reviews = props.reviews

    const [visible, setvisible] = React.useState(false)
    const [reportBody, setreportBody] = React.useState(false)
    const [reportReview, setreportReview] = React.useState(null)

    function submitReport() {
        submitReviewReport(reportReview.id, reportBody)
            .then(response => console.log('submitReport', response))
            .catch(error => logError(error, 'ReviewsComponent'))
    }

    return (
        <View>
            <View style={{}}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>تعليقات حول الخدمة</Text>
                {
                    reviews?.map((review, index) => (
                        <View key={index} style={{ borderBottomWidth: 0.7, padding:10 }}>
                            <View style={{ flexDirection: 'row', marginBottom:3 }}>
                                <Text style={{ flex: 1, fontSize:18 }}>{review.user.name}</Text>
                                <Text style={{ flex: 1}}>
                                    {(() => {
                                        let stars = []
                                        for (let i = 0; i < review.rating; i++) {
                                            stars.push(<AntDesign key={i} name="star" size={24} color="black" />)
                                        }
                                        return stars
                                    })()}
                                </Text>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => {
                                        setvisible(true)
                                        setreportReview(review)
                                    }}>
                                    <Octicons name="report" size={24} color="black" />
                                </TouchableOpacity>

                            </View>
                            <Text>{review.comment}</Text>
                        </View>
                    ))
                }
            </View>
            <ModalWrapper visible={visible}>
                <TouchableOpacity onPress={() => setvisible(false)}>
                    <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                    onChangeText={(text) => { setreportBody(text) }}
                    multiline={true}
                    numberOfLines={5}
                    style={{ borderWidth: 0.5 }}
                />
                <TouchableOpacity style={{ borderWidth: 1, backgroundColor:'#b4cbf0', padding:10 }} onPress={() => submitReport()}>
                    <Text>ارسل</Text>
                </TouchableOpacity>
            </ModalWrapper>
        </View>
    )
}