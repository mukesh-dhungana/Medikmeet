import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { primaryColor } from 'styles/colors'
import ProfileHeader from 'components/modules/Profileheader'
import MedicalHistory from './MedicalHistory'
import DrugHistory from './DrugHistory'
import AllergyHistory from './AllergyHistory'
import PregnancyHistory from './PregnancyHistory'

const FirstRoute = () => <MedicalHistory />

const SecondRoute = () => <DrugHistory />
const ThirdRoute = () => <AllergyHistory />
const FourthRoute = () => <PregnancyHistory />

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
})

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: primaryColor }}
    style={{ backgroundColor: '#F7F7F8', borderWidth: 0 }}
    scrollEnabled
    tabStyle={{ width: 200 }}
    labelStyle={{ fontSize: 12, fontWeight: 600 }}
    activeColor={primaryColor}
    inactiveColor="#B3B3BF"
  />
)

const HealthHistory = ({ navigation }: AppProps) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Medical/Surgical History' },
    { key: 'second', title: 'Drug History' },
    { key: 'third', title: 'Allergy History' },
    { key: 'fourth', title: 'Pregnancy History' },
  ])

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <ProfileHeader
        title={`Health History`}
        onBackPress={() => navigation?.navigate('PatientProfileMain')}
      />
      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width - 10 }}
          renderTabBar={renderTabBar}
        />
      </View>
      <></>
    </View>
  )
}

export default HealthHistory

const styles = StyleSheet.create({
  numbersContainer: {},
})
