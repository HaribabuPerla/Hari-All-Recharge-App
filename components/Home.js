import { View,Image,Text } from "react-native";
import Input from "../ui/Input.js";
import HomeStyles from "../sass/components/home.scss"
import Button from "../ui/Button.js";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";
import {LOGDATA} from "../constants/data.js"


export default function Home(props){
    const {isLogin} = props
    const navigation=useNavigation()
    const [isHide,setIsHide]=useState(true);
    const [number,setNumber]=useState();
    const [pwd,setPwd]=useState();
    const [name,setName]=useState()

    const changeHandler = (event, placeholder) => {
        switch (placeholder) {
          case "Mobile Number":
            setNumber(event);
            break;
          case "Password":
            setPwd(event);
            break;
          case "Name":
            setName(event);
            break;
        }
      };

    const linkHandler=()=>{
        isLogin ? navigation.navigate("Signup") : navigation.navigate("Login");
    }

    const iconHandler = () => {
        setIsHide(!isHide)
    }
    const loginBtnHandler=()=>{

        if (isLogin) {
            const validataion = LOGDATA.find(
              (data) => data.mobNumber == number && data.password == pwd
            );
      
            if (validataion) {
              navigation.navigate("Recharge");
            } else {
              Alert.alert("Please Enter correct details");
            }
          } else {
            if (name && number && pwd) {
              const data = {
                name: name,
                mobNumber: number,
                password: pwd,
              };
      
              LOGDATA.push(data);
              Alert.alert("Account Created","Your account created successfully",
              [
                {
                    text:"Login",
                    onPress : ()=>navigation.navigate("Login")
                },
                {
                    text:"OK",
                },
                    
              ]
              
              )
              
            } else {
              Alert.alert("Please Enter correct details");
            }
          }
    }

    return(
        <View style={HomeStyles.homeContainer}>
          
            <View style={HomeStyles.imgContainer}>
                <Image
                source={require("../assets/logo.jpg")}
                style={HomeStyles.imageStyle}
                />
           </View>
           {!isLogin &&
              
              <View style={HomeStyles.gapContainer}>
              <Input
                placeholder="Name"
                type="text"
                changeHandler={changeHandler}
              
              />
            </View>

           }
          
       
            <View style={HomeStyles.gapContainer}>
              <Input
                placeholder="Mobile Number"
                type="text"
                keyboardType="numeric"
                changeHandler={changeHandler}
              
              />
            </View>
            <View style={HomeStyles.gapContainer}>
              <Input
                placeholder="Password"
                type="password"
                isSecure={isHide}
                iconHandler={iconHandler}
                keyboardType="numeric"
                changeHandler={changeHandler}
              
              /> 
            </View>
            <View>
                <Button
                  btnText={isLogin ? "Login" : "Signup"}
                  btnTxtStyle={HomeStyles.btnTxtStyle}
                  btnStyle={HomeStyles.btnStyle}
                  pressHandler={loginBtnHandler}
                
                />
              
          {isLogin ? (
            <Text>
              {" "}
              If You Don't have account try to{" "}
              <Text style={HomeStyles.link} onPress={linkHandler}>
                Signup
              </Text>
            </Text>
          ) : (
            <Text>
              {" "}
              If You have account try to{" "}
              <Text style={HomeStyles.link} onPress={linkHandler}>
                Login
              </Text>{" "}
            </Text>
          )}
        
            </View>
        </View>
    )
}