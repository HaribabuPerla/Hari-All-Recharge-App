import { Text ,View,StyleSheet, FlatList, Pressable} from "react-native";
import { RECHARGE_PLANS } from "../constants/data";
import { useEffect, useState} from "react";
import axios from "axios";

export default function Plans({navigation}){
    const [planData,setPlanData]=useState([])
    useEffect(() => {
        axios.get("http://10.0.2.2:4000/get-plans").then((response) => {
            setPlanData(response.data)

        }).catch((err)=>{
            console.log("1234",err)
        });
      }, []);

    const cardPresshandler=(item)=>{
        navigation.navigate("Recharge",{amount:item});
    }
     
    const renderDetails=(item)=>{
        
        return(
            <Pressable style={styles.card} onPress={()=>cardPresshandler(item)}>
                <Text style={styles.planAmount}>{`₹${item.amount}`}</Text>
                <Text style={styles.planText}>{`Validity:${item.validity}`}</Text>
                <Text style={styles.planText}>{`Type:${item.planType}`}</Text>
                <Text style={styles.planText}>{`Offer:${item.description}`}</Text>
            </Pressable>
        )
    }

    return(
        <View style={styles.container}>
           <FlatList
            data={planData}
            keyExtractor={(item)=>item.value}
            renderItem={(item)=>renderDetails(item.item)}
           
           />
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        marginVertical:20,
        padding:20  
    },
    planText:{
        fontSize:16,
        marginTop:10
    },
    planAmount:{
     fontWeight:'bold',
     fontStyle:'italic',
     fontSize:18,
     color:"red"
    },
    card:{
        backgroundColor:"white",
        padding:10,
        borderColor:'white',
        borderWidth:2,
        marginTop:10,
        borderRadius:10,
       
    },
    cardRow:{
        flexDirection:"row",
        gap:10
    }
})