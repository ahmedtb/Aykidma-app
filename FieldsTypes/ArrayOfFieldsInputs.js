import React from 'react'
import {
    View,
    ScrollView
} from 'react-native'
import { StringFieldClass, StringFieldInput } from './StringField'
import { TextAreaFieldClass, TextAreaFieldInput } from './TextAreaField'
import { ImageFieldClass, ImageFieldInput } from './ImageField'
import { LocationFieldClass, LocationFieldInput } from './LocationField'
import { OptionsFieldClass, OptionsFieldInput } from './OptionsField'

const reducer = (array_of_fields, action) => {

    switch (action.actionType) {
        case 'change':
            array_of_fields.fields = array_of_fields.fields.map((field, fieldIndex) => {
                if (fieldIndex == action.fieldIndex)
                    field.value = action.value;
                return field;
            })
            return array_of_fields
    }
    return array_of_fields;
}

export default function ArrayOfFieldsInputs(props) {
    const props_array_of_fields = props.array_of_fields
    const setarray_of_fields = props.setarray_of_fields

    const [array_of_fields, dispatch] = React.useReducer(reducer, props_array_of_fields);
    React.useEffect(() => {
        console.log(array_of_fields)
        setarray_of_fields(array_of_fields)
    }, [array_of_fields])



    return (
        <View style={{ padding: 25 }}>
            <ScrollView>
                {
                    array_of_fields.fields?.map((field, index) => {
                        if (field.class == StringFieldClass) {
                            return <StringFieldInput
                                key={index}
                                field={field}
                                dispatch={(value) => dispatch({ actionType: 'change', fieldIndex: index, value: value })}

                            />
                        } else if (field.class == TextAreaFieldClass) {
                            return <TextAreaFieldInput
                                key={index}
                                field={field}
                                dispatch={(value) => dispatch({ actionType: 'change', fieldIndex: index, value: value })}

                            />
                        } else if (field.class == ImageFieldClass) {
                            return <ImageFieldInput
                                key={index}
                                field={field}
                                dispatch={(value) => dispatch({ actionType: 'change', fieldIndex: index, value: value })}

                            />
                        } else if (field.class == OptionsFieldClass) {
                            return <OptionsFieldInput
                                key={index}
                                field={field}
                                dispatch={(value) => dispatch({ actionType: 'change', fieldIndex: index, value: value })}
                            />
                        } else if (field.class == LocationFieldClass) {
                            return <LocationFieldInput
                                key={index}
                                field={field}
                                dispatch={(value) => dispatch({ actionType: 'change', fieldIndex: index, value: value })}

                            />
                        }
                    }
                    )
                }
            </ScrollView>
        </View>
    );

}
