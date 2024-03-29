import { TextInput,View,Text,StyleSheet,Pressable } from "react-native";
import InputStyles from "../sass/ui/input.scss";
import {Ionicons} from "@expo/vector-icons"

export default function Input(props){
    const{changeHandler,value,type,placeholder,keyboardType,isSecure,iconHandler,styleInput}=props
 
    return(
    <>
        <TextInput 
          type={type}
          value={value}
          onChangeText={(event)=> changeHandler(event,placeholder)}
          placeholder={placeholder}
          style={styleInput ? styleInput : InputStyles.inputClass}
          keyboardType={keyboardType ? keyboardType:"default"}
          secureTextEntry={isSecure}
        
        />
        <View style={{position:'relative'}}>
          {
            type == "password" && value?.length > 0 &&
            <Pressable   onPress={iconHandler}>
            <Ionicons style={InputStyles.icon}  name={isSecure ? "eye-off-outline" :"eye-outline"} size={30} />
            </Pressable>
          }
        </View>
        </>
          
        
    )
}
