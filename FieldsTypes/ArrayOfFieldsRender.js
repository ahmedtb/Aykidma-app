import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { StringFieldClass, StringFieldRender } from './StringField'
import { TextAreaFieldClass, TextAreaFieldRender } from './TextAreaField'
import { ImageFieldClass, ImageFieldRender } from './ImageField'
import { LocationFieldClass, LocationFieldRender } from './LocationField'
import { OptionsFieldClass, OptionsFieldRender } from './OptionsField'

export default function ArrayOfFieldsRender(props) {

    const array_of_fields = props.array_of_fields

    return (
        <View>
            {
                array_of_fields.fields.map((fields, index) => {

                })
            }
        </View>
    )
}