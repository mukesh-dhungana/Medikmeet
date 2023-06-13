import { View, StyleSheet, ScrollView } from 'react-native'
import ButtonEl from 'components/elements/Button'
import useForm from 'hooks/useForm'
import KeyboardDismiss from 'components/modules/KeyboardDismiss'
import Dropdown from 'components/elements/form/Dropdown'
import { primaryColor } from 'styles/colors'
import { useNavigation } from '@react-navigation/native'
import InputEl from 'components/elements/form/InputEl'
import { getCity, getCountry, getIdTypes, getKnownLanguages } from 'services/masters'
import { dropdownItems } from 'ts/types'
import { getDropdownFormat } from 'helpers/utils'
import {
  addKnownLanguages,
  getDoctorKnownLanguages,
  updateDoctorProfile,
} from 'services/doctorprofile'
import { useAppDispatch, useAppSelector } from 'redux/hook'
import { hideLoading, showLoading } from 'redux/reducer/commonSlice'
import { updateDoctorProfileDetails } from 'redux/reducer/drProfileSlice'
import { useEffect, useState } from 'react'
import { updatePatientProfile } from 'services/patientprofile'
import { updatePatientProfileDetails } from 'redux/reducer/patientProfileSlice'

const Fields = [
  {
    label: 'Email',
    type: 'textInput',
    name: 'email',
    isDisabled: true,
    isRequired: true,
  },
  {
    label: 'Mobile',
    name: 'mobile',
    type: 'textInput',
    isDisabled: true,
    isRequired: true,
  },
  {
    label: 'Address',
    type: 'textInput',
    name: 'address',
    isRequired: true,
  },
  {
    label: 'City/Town',
    name: 'city_name',
    type: 'textInput',
    isRequired: true,
  },
  {
    label: 'Postal Code',
    type: 'textInput',
    name: 'pincode',
    isRequired: true,
  },
  {
    label: 'Nationality',
    type: 'dropdown',
    items: [{ label: 'Malaysia', value: 'Malaysia' }],
    zIndex: 200,
    name: 'country_id',
    isRequired: true,
  },
]

const defaultFormState = {
  email: '',
  mobile: '',
  address: { isRequired: true, value: '' },
  city_name: '',
  pincode: { isRequired: true, value: '' },
  country_id: { isRequired: true, value: '' },
  id_type_id: '',
  id_number: '',
  passport: '',
}

const ContactInfoForm = () => {
  const { formState, onChange, errors, validateForm, setFormState } = useForm(defaultFormState)
  const [dropdownItems, setDropdownItems] = useState<Record<string, dropdownItems[]>>()
  const navigation = useNavigation()
  const { profile } = useAppSelector((state) => state.patientProfile)
  const dispatch = useAppDispatch()

  const formFields = Fields.map((field) => ({
    ...field,
    error: errors[field.name],
    value: formState[field.name],
  }))

  const onFormSubmit = async () => {
    const isValidated = await validateForm()
    if (isValidated) {
      dispatch(showLoading())
      try {
        const data = {
          ...formState,
          address: formState['address']?.value,
          country_id: formState['country_id']?.value,
          id_type_id: formState['id_type_id'],
          id_number: formState['id_number'],
        }
        const res2 = await updatePatientProfile(data)

        if (res2.status) {
          dispatch(updatePatientProfileDetails(data))
          dispatch(hideLoading())

          navigation.navigate('PatientProfileMain' as never)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchMastersData = async () => {
    const cities = await getCity()
    const countries = await getCountry()
    const idTypes = await getIdTypes()
    setDropdownItems({
      country_id: getDropdownFormat(countries.data.data.countries),
      id_type_id: getDropdownFormat(idTypes.data.data.id_types),
    })
  }

  useEffect(() => {
    fetchMastersData()
    setFormState({
      ...defaultFormState,
      ...profile,
      address: { isRequired: true, value: profile?.address },
      country_id: { isRequired: true, value: profile?.country_id },
      id_type_id: profile?.id_type_id,
      id_number: profile?.id_number,
    })
  }, [])

  return (
    <ScrollView>
      <View style={styles.form}>
        <KeyboardDismiss>
          {formFields.map((field) =>
            field.type === 'textInput' ? (
              <View
                style={{ marginTop: field?.label === 'Postal Code' ? 0 : 0, zIndex: 100 }}
                key={field.name}
              >
                <InputEl
                  disabled={field?.isDisabled}
                  label={field.label}
                  error={field.error}
                  value={formState[field.name]?.value ?? formState[field.name]}
                  onChangeText={(text: string) => onChange(field.name, text)}
                  isRequired={field.isRequired}
                />
              </View>
            ) : (
              <Dropdown
                key={field.name}
                value={formState[field.name]?.value ?? formState[field.name]}
                items={dropdownItems?.[field.name]}
                error={field.error}
                placeholder={field.label}
                setValue={(value: string) => onChange(field.name, value)}
                isRequired={field.isRequired}
                zIndex={100}
                zIndexInverse={50}
                scroll
                searchable
              />
            )
          )}

          <Dropdown
            value={formState['id_type_id']}
            items={dropdownItems?.['id_type_id']}
            placeholder="ID Type"
            setValue={(value: string) => onChange('id_type_id', value)}
            zIndex={1000}
            zIndexInverse={3000}
            name="id_type_id"
            adjustScrollMargin
          />

          {formState['id_type_id'] === 1 ? (
            <InputEl
              label="IC(Old/New)"
              value={formState['id_number']}
              onChangeText={(text: string) => onChange('id_number', text)}
            />
          ) : (
            <InputEl
              label="Passport Number"
              value={formState['passport']}
              onChangeText={(text: string) => onChange('passport', text)}
            />
          )}
          <ButtonEl
            onPress={onFormSubmit}
            style={{ marginVertical: 20 }}
            btnTextColor={primaryColor}
          >
            Save
          </ButtonEl>
        </KeyboardDismiss>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
  },
})

export default ContactInfoForm
