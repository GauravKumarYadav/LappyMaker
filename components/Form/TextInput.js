import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

const TextField = ({ iconName, validator ,...rest }) => {
    const [input, setInput] = useState(null);
    const [state, setState] = useState(null);
    const color = state === null ? '#8a8d90' : (state === true) ? "#2793d1" : "#ff0058";
    const validate = ()=>{
        const valid = validator(input);
        setState(valid);
    };
    return (
        <View style={{
            flexDirection: 'row',
            height: '20%',
            alignItems: 'center',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: color,
            margin:12
        }}
        >
            <View style={{ padding: 8 }} >
                <Icon
                    name={iconName}
                    size={25}
                    color={color}
                />
            </View>
            <View style={{flex:1,alignSelf:'center'}} >
                <TextInput
                    // underlineColorAndroid='transparent'
                    placeholderTextColor={color}
                    onBlur={validate}
                    onChangeText={
                        (text)=>{
                            setInput(text);
                            if(state !== null){
                                validate();
                            }
                        }}
                    {...rest}
                />
            </View>
            {
                (state === true || state === false) &&
                (
                    <View style={{ borderRadius: 10, height: 20, width: 20,justifyContent:'center',margin:5,alignItems:'center',backgroundColor: state === true ? '#2793d1' : "#ff0058" }} >
                        <Icon
                            name={state === true ? 'check' : 'x'}
                            color='white'
                            size={16}
                        />
                    </View>
                )
            }

        </View>
    );
}

export const CheckBox =({label,})=>{
    const [checked,setChecked] = useState(false);

    return(
        <RectButton onPress={()=>setChecked((c)=> !c )} >
        <View 
        style={{
            flexDirection:'row',
            alignItems:'center',
        }}
        >
            <View
                style={{
                    marginRight:8,
                    height:20,
                    width:20,
                    borderRadius:5,
                    justifyContent:'center',
                    alignItems:'center',
                    borderWidth:1,
                    borderColor:'#2793d1',
                    backgroundColor:checked ? "#2793d1" : "white" ,
                }}
            >
                <Icon name='check' color="white" />
            </View>
            <Text style={{}} >
                {label}
            </Text>
        </View>
        </RectButton>
    );
};


export default TextField;

const styles = StyleSheet.create({

});