import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TextInput,
    ScrollView,
    Pressable,
    TouchableOpacity,
    Modal
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function OptionsTitlesEditor(props) {
    // let titles = [...props.titles]
    const [titles, setTitles] = React.useState(props.titles)
    const onChange = props.onChange
    const [visible, setVisible] = React.useState(false)

    function onTitleChange(title, index) {
        let changedArray = [...titles]
        changedArray[index] = title
        setTitles(changedArray)
        onChange(changedArray)
    }

    return (
        <View >
            <View style={{ padding: 5 }}>
                <TouchableOpacity onPress={() => setVisible(true)}>
                    <View style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5, textAlign: 'center', padding: 7, fontSize: 18 }}>
                        {titles.map((title, index) => (
                            <Text key={index}>{title}</Text>
                        ))}
                    </View>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: 'rgba(52, 52, 52, 0.9)',
                    marginTop: 22
                }}>
                    <View style={{
                        margin: 20,
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}>

                        <View>
                            {titles.map((title, index) => (
                                <TextInput key={index} style={{ fontSize: 12, borderWidth: 1 }}
                                    onChangeText={(text) => {
                                        onTitleChange(text, index)
                                    }}
                                    value={title}
                                />
                            ))}
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>

                            <Pressable
                                onPress={() => setVisible(!visible)}
                            >
                                <Text >اغلاق</Text>
                            </Pressable>

                        </View>

                    </View>
                </View>
            </Modal>
        </View >
    )
}

function RemoveFieldButton(props) {
    const deleteField = props.deleteField
    return (
        <TouchableOpacity onPress={() => deleteField()}>
            <AntDesign name="closecircleo" size={24} color="black" />
        </TouchableOpacity>
    )
}

const FieldsEditorComponent = (props) => {

    const fields = props.fields
    const onChange = props.onChange

    const [newFields, setNewFields] = React.useState(fields)

    function change(value, index) {
        let changed = [...newFields]
        changed[index].value = value
        setNewFields(changed)
        onChange(changed)
    }

    function changeLabel(label, index) {
        let changed = [...newFields]
        changed[index].label = label
        setNewFields(changed)
        onChange(changed)
    }

    function changeSubLabel(subLabel, index) {
        let changed = [...newFields]
        changed[index].subLabel = subLabel
        setNewFields(changed)
        onChange(changed)
    }

    function changeTitles(titles, index) {
        let changed = [...newFields]
        changed[index].titles = titles
        setNewFields(changed)
        onChange(changed)
    }

    function deleteField(index){
        let changed = [...newFields]
        changed.splice(index, 1);
        setNewFields(changed)
        onChange(changed)
    }


    return (
        <View style={{ padding: 25 }}>
            <ScrollView>
                {
                    newFields.map((field, fieldIndex) => {
                        if (field.type === 'string') {
                            return (
                                <View key={fieldIndex}>
                                    <RemoveFieldButton deleteField={()=>deleteField(fieldIndex)} />
                                    <TextInput style={{ fontSize: 12 }}
                                        onChangeText={(text) => {
                                            changeLabel(text, fieldIndex)
                                        }}
                                        value={field.label}
                                    />
                                    <TextInput
                                        style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5 }}
                                        onChangeText={(text) => {
                                            change(text, fieldIndex)
                                        }}
                                        value={field.value}
                                    />
                                </View>
                            )
                        } else if (field.type === 'textarea') {
                            return (
                                <View key={fieldIndex}>
                                    <RemoveFieldButton deleteField={()=>deleteField(fieldIndex)} />
                                    <TextInput style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderRadius: 7 }}
                                        onChangeText={(text) => {
                                            changeLabel(text, fieldIndex)
                                        }}
                                        value={field.label}
                                    />
                                    {(field.subLabel) ? (
                                        <TextInput style={{ fontSize: 12, borderWidth: 1, borderRadius: 7 }}
                                            onChangeText={(text) => {
                                                changeSubLabel(text, fieldIndex)
                                            }}
                                            value={field.subLabel}
                                        />
                                    ) : null}

                                    <View style={{ borderWidth: 1, borderRadius: 10, marginVertical: 5, padding: 30, backgroundColor: 'grey' }} />
                                </View>
                            )
                        } else if (field.type === 'options') {
                            return (
                                <View key={fieldIndex}>
                                    <RemoveFieldButton deleteField={()=>deleteField(fieldIndex)} />
                                    <TextInput style={{ fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderRadius: 7 }}
                                        onChangeText={(text) => {
                                            changeLabel(text, fieldIndex)
                                        }}
                                        value={field.label}
                                    />
                                    <OptionsTitlesEditor titles={field.titles} onChange={
                                        (value) => changeTitles(value, fieldIndex)
                                    } />
                                </View>
                            )
                        } else if (field.type === 'location') {
                            return (
                                <View key={fieldIndex} >
                                    <RemoveFieldButton deleteField={()=>deleteField(fieldIndex)} />

                                    <View style={{ margin: 8 }}>

                                        <TextInput style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderRadius: 7 }}
                                            onChangeText={(text) => {
                                                changeLabel(text, fieldIndex)
                                            }}
                                            value={field.label}
                                        />
                                    </View>
                                    <Image source={require('../../../resources/MapIcon.png')} style={{ width: 100, height: 100 }} />
                                </View>
                            )
                        } else if (field.type == 'image') {
                            return (
                                <View key={fieldIndex}>
                                    <RemoveFieldButton deleteField={()=>deleteField(fieldIndex)} />
                                    <TextInput style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderRadius: 7 }}
                                        onChangeText={(text) => {
                                            changeLabel(text, fieldIndex)
                                        }}
                                        value={field.label}
                                    />
                                    <View style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1 }} >
                                        <AntDesign name="camerao" size={75} color="black" />
                                    </View>
                                </View>
                            )
                        }
                        return null;
                    })
                }
            </ScrollView>
        </View>
    );
}

export default FieldsEditorComponent;