import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import RechargeHome from '../widgits/RechargeHome';
import { OPERATOR_DATA, DTH_DATA } from "../constants/data";

const FirstRoute = () => (
  <View style={{ flex: 1,}}>
    <RechargeHome listData={OPERATOR_DATA}/>
</View>
);

const SecondRoute = () => (
  <View style={{ flex: 1,  }} >
        <RechargeHome listData={DTH_DATA}/>
 </View>


);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
export default function Recharge() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'Mobile Recharge' },
      { key: 'second', title: 'DTH Recharge' },
    ]);
  
    return (
      <RechargeHome listData={DTH_DATA}/>
      
      // <TabView
      //   navigationState={{ index, routes }}
      //   renderScene={renderScene}
      //   onIndexChange={setIndex}
      //   initialLayout={{ width: layout.width }}
      //   style={{marginTop:20}}
      // />
   
    );
}