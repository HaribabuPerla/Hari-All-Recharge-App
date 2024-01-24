import { Text,StyleSheet,View,FlatList } from "react-native"
import SelectInput from "../components/SelectInput"
import { useEffect, useState } from "react"
import Input from "../ui/Input"
import Button from "../ui/Button";
import { Alert } from "react-native";
import RechargeHomeStyles from "../sass/Widgits/RechargeHome.scss"
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";






export default function Recharge({listData}){
  const navigation=useNavigation()
  const route =useRoute()
   
    const [listActive,setListActive]=useState(false);
    const [selectedval,setSelectedVal]=useState('');
    const [amount,setAmount]=useState("");
    const [mobNum,setMobnum]=useState("");
    const [rechargeData,setrechargeData]=useState([]);
    const [bal,setBal]=useState(5000)
   

    const pressHandler=(value)=>{
        setSelectedVal(value)
        setListActive(false)
     }
  
  const inputHandler=(value)=>{
   
    setAmount(value)
  }
  const mobHandler=(value)=>{
    setMobnum(value)
  }

  
    const listActivehandler=(value)=> {
        setListActive(value)
    }

    const btnPressHandler=()=>{
        let amountVal = parseInt(amount)
        let uniId= Math.ceil(Math.random()*100)
      
        if(selectedval && mobNum.length == 10  &&(amount|| route?.params?.amount)){
            if(amountVal <= bal){
            
            Alert.alert(
                `Your ${mobNum} is Recharged Successfully`, 
                 `You Recharged plan amount is ${amount || route?.params?.amount}`,
            )
            
            setrechargeData((prev)=>[...prev,{id:uniId,num:mobNum,status:"Success",sim:selectedval,bal:amount}])

            setAmount("");
            setSelectedVal('');
            setMobnum("")
            setBal(bal-amountVal)
            }
            else{
                Alert.alert(
                    "Please Check balance"
                )

            }
          
            

          

        }else{
            Alert.alert(
                "Please provide valid data"
            )
            setrechargeData((prev)=>[...prev,{id:uniId,num:mobNum,status:"Failed",sim:selectedval,bal:amount}])
        }
        
    }
    const plansHandler=()=>{
        navigation.navigate("Plans")
    
    }
    useEffect(()=>{
      if(route?.params?.amount){
        setAmount(route.params.amount.amount)
      }
    },[route])

    const renderDetails=(item)=>{
        return(
            <>
            <View style={[RechargeHomeStyles.statusContainer,item.status=="Failed" && RechargeHomeStyles.statusBg]}>
            <Text style={RechargeHomeStyles.stText}>{item.sim || "NA"} </Text>
            <Text style={RechargeHomeStyles.stText}>{item.num || "NA"}</Text>
            <Text style={RechargeHomeStyles.stText}>{`₹ ${item.bal}`}</Text>
            <Text style={RechargeHomeStyles.stText}>{item.status}</Text>
            </View>
            </>
        )

    }

    return(
        <View style={{flex:1}}>
       

 
        <View style={RechargeHomeStyles.balanceContainer}>
           <Text style={RechargeHomeStyles.balance}>Balance:{bal}</Text>
      </View>
      <View style={RechargeHomeStyles.rechargeContainer}>
        <View>
             <SelectInput
                pressHandler={pressHandler}
                selectedval={selectedval}
                placeholder="Select Operator"
                listActive={listActive}
                listActivehandler={listActivehandler}
                listData={listData}
          />
        </View>
        <View style={RechargeHomeStyles.gapContainer}>
          <Input
            styleInput={RechargeHomeStyles.inputField}
            placeholder={"Enter Mobile Number"}
            changeHandler={mobHandler}
            keyboardType="numeric"
            value={mobNum}

          />
        </View>

        <View style={RechargeHomeStyles.gapContainer}>
          <Input
            styleInput={RechargeHomeStyles.inputField}
            placeholder="Enter  Amount"
            changeHandler={inputHandler}
            keyboardType="numeric"
            value={amount}

         />
        </View>

        <View style={RechargeHomeStyles.btnContainer}>
      <Button
        btnText="View Plans"
        pressHandler={plansHandler}
        btnStyle={RechargeHomeStyles.viewPlansBtnContainer}
        btnTxtStyle={RechargeHomeStyles.viewBtnTxt}
        
      
      />
      <Button
        btnText="submit"
        pressHandler={btnPressHandler}
        btnStyle={RechargeHomeStyles.submitBtnContainer}
        btnTxtStyle={RechargeHomeStyles.viewBtnTxt}
    
        
      
      />
      </View>

      </View>
      <View style={RechargeHomeStyles.historyContainer}>
      
        
    { rechargeData.length > 0 &&
    
      <View style={RechargeHomeStyles.flatContainer}>
      <Text style={RechargeHomeStyles.rcgHead}>Recharge History</Text>
      <FlatList
      data={rechargeData}
      keyExtractor={(item)=>item.id}
      renderItem={(item)=>renderDetails(item.item)}
      
      
      />
      </View>
} 
      </View>
    
 

      
 </View>
    )
}


