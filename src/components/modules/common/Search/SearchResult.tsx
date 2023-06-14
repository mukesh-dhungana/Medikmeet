import * as React from 'react'
import { Pressable, View } from 'react-native'
import DoctorList from './DoctorList'
import TopicsList from './TopicsList'
import MyText from 'components/elements/MyText'
import { ScrollView } from 'react-native-gesture-handler'
import { isEmpty } from 'utils'

interface ISearchResultProps {
  searchType: string
  goBack: Function
  showGoBack?: Boolean
  showFollowBtn?: boolean
  showTeleConsultBtn?: boolean
  showAppointmentBtn?: boolean
  topicListComponent?: React.ReactNode
}

const SearchResult: React.FunctionComponent<ISearchResultProps> = (props) => {
  const {
    searchType,
    goBack,
    showGoBack,
    showFollowBtn,
    showTeleConsultBtn,
    showAppointmentBtn,
    topicListComponent,
  } = props
  return (
    <View style={{ marginBottom: 50 }}>
      {showGoBack && (
        <View>
          <Pressable onPress={() => goBack()}>
            <MyText
              style={{
                marginBottom: 10,
                color: '#447fe1',
                fontSize: 10,
                textDecorationLine: 'underline',
              }}
            >
              Go back
            </MyText>
          </Pressable>
        </View>
      )}
      <ScrollView>
        {searchType === 'doctor' ? (
          <DoctorList
            showFollowBtn={showFollowBtn}
            showAppointmentBtn={showAppointmentBtn}
            showTeleConsultBtn={showAppointmentBtn}
          />
        ) : !isEmpty(topicListComponent) ? (
          topicListComponent
        ) : (
          <TopicsList />
        )}
      </ScrollView>
    </View>
  )
}

export default SearchResult
