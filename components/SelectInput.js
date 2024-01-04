import { View,TextInput, FlatList,StyleSheet,Text, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import SelectInputStyles from "../sass/components/SelectInput.scss";

export default function DropDown({listData,placeholder,listActive,listActivehandler,pressHandler,selectedval}){

   const[textValue,setTextValue]=useState("");
   const [filterData,setFilterData]=useState([])
  

   useEffect(()=>{
      if(textValue.length > 0){
         let converrtedValue=textValue.toLowerCase();
        let data= listData?.filter((item)=>item.value.includes(converrtedValue))
        
        setFilterData(data?.length > 0 && data)

      }

   },[textValue])

   const changeHandler=(enteredValue)=>{
          listActivehandler(true)
         setTextValue(enteredValue)
   }
    
    useEffect(()=>{
       if(selectedval.length>0){
        listActivehandler(false)
     }
    },[selectedval])


    const renderItem=(item)=>{
       return(
          <Text style={SelectInputStyles.textDrop}  onPress={()=>{pressHandler(item.item.label),setTextValue(item.item.label)}}>{item.item.label}</Text>
       )
  

    }




return(


   <>
   <View style={SelectInputStyles.inputContainer}>
     <Text style={SelectInputStyles.selectTxt} onPress={()=>{ listActivehandler(true)}}>{selectedval||placeholder}</Text>
   </View>
   
   
  {
    listActive &&
    <View style={SelectInputStyles.dataContainer} onPress={()=>{listActivehandler(false)}}>
      <TextInput value={textValue} onChangeText={changeHandler} style={SelectInputStyles.search}   placeholder={"Search"} />
        <FlatList
           data={textValue.length > 0 && filterData?.length > 0 ? filterData :listData}
           keyExtractor={(item)=>item.id}
           renderItem={(item)=>renderItem(item)}
        
        />
      </View>
  }

     

   
   
   
   </>
)


}