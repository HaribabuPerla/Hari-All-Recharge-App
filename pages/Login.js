import { KeyboardAvoidingView, Text,View } from "react-native";
import LoginStyles  from "../sass/pages/Login.scss"
import Home from "../components/Home";

export default function Login(){
   
    return(
        <View style={LoginStyles.container}>
            <View style={LoginStyles.loginContainer}> 
               <Home isLogin={true}/>
                
             </View>
    
            <View style={LoginStyles.footer}>
                <Text style={LoginStyles.footerText}>Contact:developer.haribabuperla@gmail.com</Text>
            </View>
        

        </View>
    )
}