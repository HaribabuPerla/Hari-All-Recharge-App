import { Pressable,Text } from "react-native";

export default function Button(props){
    const {btnStyle,btnText,btnTxtStyle,pressHandler}=props
 
    return(
        <Pressable style={btnStyle} onPress={pressHandler}>
             <Text style={btnTxtStyle}>{btnText}</Text>
        </Pressable>
    )
}