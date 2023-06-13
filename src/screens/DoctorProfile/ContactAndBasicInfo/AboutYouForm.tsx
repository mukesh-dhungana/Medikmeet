import { View, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import ButtonEl from 'components/elements/Button'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import { primaryColor } from 'styles/colors'
import { useNavigation } from '@react-navigation/native'

import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import InputEl from 'components/elements/form/InputEl'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { updateDoctorProfile } from 'services/doctorprofile'
import { updateDoctorProfileAbout } from 'redux/reducer/drProfileSlice'
import { HelperText } from 'react-native-paper'

const defaultFormState = {
  about: '',
}

const AboutYouForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)

  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const { profile } = useAppSelector((state) => state.drProfile)

  useEffect(() => {
    setFormState({ about: profile?.about })
  }, [])

  const onFormSubmit = async () => {
    const isValidated = await validateForm()

    if (isValidated) {
      try {
        dispatch(showLoading())
        const response = await updateDoctorProfile({ about: formState?.about })
        if (response?.status) {
          dispatch(updateDoctorProfileAbout(formState?.about))
          navigation.navigate('ProfileMain' as never)
        }
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(hideLoading())
      }
    }
  }

  return (
    <View style={styles.form}>
      <KeyboardDismiss>
        <InputEl
          multiLine={true}
          numberOfLines={5}
          label={'About You'}
          value={formState['about']}
          onChangeText={(text: string) => onChange('about', text)}
          // disabled
        />
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: -25 }}>
          <HelperText type="info" visible={true}>
            This field allow max length of 2000 characters
          </HelperText>
          <HelperText type="info" visible={true}>
            {formState?.about?.length}/2000
          </HelperText>
        </View>
        <ButtonEl onPress={onFormSubmit} style={{ marginVertical: 20 }} btnTextColor={primaryColor}>
          Save
        </ButtonEl>
      </KeyboardDismiss>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    flex: 1,
  },
})

export default AboutYouForm
