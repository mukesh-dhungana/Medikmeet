import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { AppProps } from 'screens/Authentication/LoginWithEmail'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { primaryColor } from 'styles/colors'
import ProfileHeader from 'components/modules/Profileheader'
import FamilyIllnessRecord from './FamilyIllnessRecord'
import DeathHistory from './DeathHistory'

const FirstRoute = () => <FamilyIllnessRecord />

const SecondRoute = () => <DeathHistory />

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
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

const FamilyHealthHistory = ({ navigation }: AppProps) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'Medical/Surgical History' },
    { key: 'second', title: 'Death History' },
  ])

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7F8' }}>
      <ProfileHeader
        title={`Family Health History`}
        onBackPress={() => navigation?.navigate('PatientProfileMain')}
      />
      <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
      <></>
    </View>
  )
}

export default FamilyHealthHistory

const styles = StyleSheet.create({
  numbersContainer: {},
})
