import React, { Component } from 'react';
import MultiSelect from 'react-native-multiple-select';

import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView, TouchableOpacity } from "react-native";
import Navbar from "./../../components/Navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';


const SymptosForm = ({ route, navigation }) => {
  let { patient_id } = route.params;

  const [date, setDate] = useState(new Date());
  let [selectedItems, setselectedItems] = useState([])
  let [items, setitems] = useState([])
  let [showPrediction, setshowPrediction] = useState(false)
  let [predictedDisease, setpredictedDisease] = useState('')
  let [confideceScore, setconfideceScore] = useState('')
  let [temperature, settemperature] = useState('')
  let [bloodPressure, setbloodPressure] = useState('')
  let [suggestion, setsuggestion] = useState('')
  let [summary, setsummary] = useState('')
  let [assumedDisease, setassumedDisease] = useState('')
  let [nextVisit, setnextVisit] = useState(new Date())


  let [name, setname] = useState('')
  let [age, setage] = useState('')
  let [gender, setgender] = useState('')

  let sortedSymptoms = ['abdominal_pain', 'abnormal_menstruation', 'acidity', 'acute_liver_failure', 'altered_sensorium', 'anxiety', 'back_pain',
    'belly_pain', 'blackheads', 'bladder_discomfort', 'blister', 'blood_in_sputum', 'bloody_stool', 'blurred_and_distorted_vision',
    'breathlessness', 'brittle_nails', 'bruising', 'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'coma', 'congestion',
    'constipation', 'continuous_feel_of_urine', 'continuous_sneezing', 'cough', 'cramps', 'dark_urine', 'dehydration', 'depression', 'diarrhoea',
    'dischromic _patches', 'distention_of_abdomen', 'dizziness', 'drying_and_tingling_lips', 'enlarged_thyroid', 'excessive_hunger', 'extra_marital_contacts',
    'family_history', 'fast_heart_rate', 'fatigue', 'fluid_overload', 'fluid_overload', 'foul_smell_of urine', 'headache', 'high_fever', 'hip_joint_pain',
    'history_of_alcohol_consumption', 'increased_appetite', 'indigestion', 'inflammatory_nails', 'internal_itching', 'irregular_sugar_level', 'irritability',
    'irritation_in_anus', 'itching', 'joint_pain', 'knee_pain', 'lack_of_concentration', 'lethargy', 'loss_of_appetite', 'loss_of_balance', 'loss_of_smell', 'malaise',
    'mild_fever', 'mood_swings', 'movement_stiffness', 'mucoid_sputum', 'muscle_pain', 'muscle_wasting', 'muscle_weakness', 'nausea', 'neck_pain', 'nodal_skin_eruptions',
    'obesity', 'pain_behind_the_eyes', 'pain_during_bowel_movements', 'pain_in_anal_region', 'painful_walking', 'palpitations', 'passage_of_gases', 'patches_in_throat',
    'phlegm', 'polyuria', 'prominent_veins_on_calf', 'puffy_face_and_eyes', 'pus_filled_pimples', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'red_sore_around_nose',
    'red_spots_over_body', 'redness_of_eyes', 'restlessness', 'runny_nose', 'rusty_sputum', 'scurring', 'shivering', 'silver_like_dusting', 'sinus_pressure', 'skin_peeling', 'skin_rash',
    'slurred_speech', 'small_dents_in_nails', 'spinning_movements', 'spotting_ urination', 'stiff_neck', 'stomach_bleeding', 'stomach_pain', 'sunken_eyes', 'sweating', 'swelled_lymph_nodes',
    'swelling_joints', 'swelling_of_stomach', 'swollen_blood_vessels', 'swollen_extremeties', 'swollen_legs', 'throat_irritation', 'toxic_look_(typhos)', 'ulcers_on_tongue', 'unsteadiness',
    'visual_disturbances', 'vomiting', 'watering_from_eyes', 'weakness_in_limbs', 'weakness_of_one_body_side', 'weight_gain', 'weight_loss', 'yellow_crust_ooze', 'yellow_urine', 'yellowing_of_eyes', 'yellowish_skin']


  let handleChangeTemperature = (value) => {
    console.log(value)
    settemperature(value)
  }

  let handleChangeBloodPressure = (value) => {
    console.log(value)
    setbloodPressure(value)
  }

  let handleChangeSuggestion = (value) => {
    console.log(value)
    setsuggestion(value)
  }

  let handleChangeAssumedDisease = (value) => {
    console.log(value)
    setassumedDisease(value)
  }

  let handleChangeNextVisit = (value) => {
    console.log(value)
    setnextVisit(value)
  }

  let handleChangeSummary = (value) => {
    console.log(value)
    setsummary(value)
  }

  useEffect(() => {
    getContents()
  }, [])

  let getContents = async () => {
    let tok = await AsyncStorage.getItem('token')
    tok = JSON.parse(tok)

    console.log(tok)
    let response = await fetch(global.ip + '/chw/symptomsList', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'TOKEN ' + tok
      },
      body: JSON.stringify(patient_id)
    })
    let d = await response.json()
    // console.log(d)
    setname(d.name)
    setage(d.age)
    setgender(d.gender)
    for (let i = 0; i < sortedSymptoms.length; i++) {
      let now = sortedSymptoms[i]
      let id = i.toString()
      let name = now
      setitems(prevArray => [...prevArray, { id: id, name: name }]);
      // console.log(now)
    }

    console.log("etuku")
    // console.log(items)
  }
  let onSelectedItemsChange = (sItems) => {
    console.log("here")
    setselectedItems([])
    for (let i = 0; i < sItems.length; i++) {
      let id = sItems[i]
      setselectedItems(prevArray => [...prevArray, id])
    }
  };

  const ref = useRef(null)

  let handleSubmit = async () => {
    console.log(selectedItems)
    let tok = await AsyncStorage.getItem('token')
    tok = JSON.parse(tok)
    console.log(tok)
    let response = await fetch(global.ip + '/chw/getPrediction', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'TOKEN ' + tok
      },
      body: JSON.stringify({ selectedItems })
    })
    let data = await response.json()
    setshowPrediction(true);
    setpredictedDisease(data.predicteddisease);
    setconfideceScore(data.confidencescore);
    console.log(data)
    console.log(predictedDisease)
    console.log(confidenceScore)

  }

  let handleSubmitFinal = async () => {
    let chw_id = await AsyncStorage.getItem('chw_id');
    chw_id = JSON.parse(chw_id)
    console.log(temperature, bloodPressure, suggestion, assumedDisease, nextVisit, summary)
    console.log(selectedItems)
    let tok = await AsyncStorage.getItem('token')
    tok = JSON.parse(tok)
    let response = await fetch(global.ip + '/chw/saveVisitForm', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'TOKEN ' + tok
      },
      body: JSON.stringify({ patient_id, selectedItems, chw_id, temperature, bloodPressure, suggestion, assumedDisease, nextVisit, summary })
    })
    let data = await response.json()
    console.log(data)
    if (data === 'True') {
      setisLoggedIn(true)
    }
    else {
      setfailedLogin(true)
    }

  }

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation}></Navbar>

      <Card>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>ভিজিট ফর্ম</Text>
        </View>
        <Card.Divider style={{ borderBottomColor: 'black', borderBottomWidth: 1,}}></Card.Divider>
        <View style={styles.text2}>
          <Text style={styles.text}>   রোগীর নাম: {name}</Text>
          <Text style={styles.text}>   লিঙ্গ: {gender}</Text>
          <Text style={styles.text}>   বয়স: {age}</Text>
          <Text style={styles.text}>   তারিখ:  {new Date().toDateString()} </Text>
        </View>
      </Card>



      <ScrollView>

        <Card>

        <View style={styles.text2}>
          <Text style={styles.textLabel}>    তাপমাত্রা (ফারেনহাইট): </Text>
          <Input onChangeText={handleChangeTemperature} />

          <Text style={styles.textLabel}>    রক্তচাপ: </Text>
          <Input onChangeText={handleChangeBloodPressure} />
        </View>

        <View>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={ref}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText=" লক্ষণ সিলেক্ট করুন"
            searchInputPlaceholderText="লক্ষণ খুঁজুন"
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#000" }}
            styleMainWrapper={{ padding: 10 }}
            tagContainerStyle={{ backgroundColor: "#000" }}
            hideSubmitButton={true}
            styleListContainer={{ height: 256 }}
          // submitButtonColor="#0c6efc"
          // submitButtonText="সাবমিট"
          />
        </View>

        <View>


          <View style={{ flex: 1, margin: 10 }}>
            {ref && ref.current && ref.current.getSelectedItemsExt(selectedItems)}
          </View>

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText} onPress={handleSubmit}>প্রেডিকশন দেখুন</Text>
          </TouchableOpacity>

          <View style={[showPrediction ? styles.text2 : styles.text3]}>
            <Text style={styles.text}>    সম্ভাব্য রোগ: {predictedDisease}</Text>
            <Text style={styles.text}>    সম্ভাবনা: {confideceScore}%</Text>
            <Card.Divider style={{ borderBottomColor: 'black', borderBottomWidth: 1,}}></Card.Divider>
          </View>

          
          <View style={styles.text2}>
            <Text style={styles.textLabel}>    অনুমিত রোগ: </Text>
            <Input onChangeText={handleChangeAssumedDisease} />

            <Text style={styles.textLabel}>    পরামর্শ: </Text>
            <Input
              multiline={true}
              numberOfLines={3}
              onChangeText={handleChangeSuggestion} />

            <Text style={styles.textLabel}>    সামারি: </Text>
            <Input
              multiline={true}
              numberOfLines={3}
              onChangeText={handleChangeSummary} />

            <Text style={styles.textLabel}>    পরবর্তী ভিজিট এর তারিখ: </Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={nextVisit}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderColor: "gray",
                  alignItems: "center",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  marginLeft: 10,
                },
                dateText: {
                  fontSize: 17,
                }
              }}
              onDateChange={(date) => {
                console.log(date)
                setnextVisit(date);
              }}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleSubmitFinal}>
            <Text style={styles.loginText}>সংরক্ষণ করুন</Text>
          </TouchableOpacity>


        </View>

        </Card>

        
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({

  submitButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#41cca6"
  },

  posts: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    padding: 10,
  },

  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 0,
    alignItems: "center",
    justifyContent: 'space-between'
  },

  title: {
    fontWeight: "bold",
    marginVertical: 4,
    fontSize: 20,
  },

  text: {
    fontWeight: "bold",
    backgroundColor: "white",
    color: "black",
    // textAlign : "center",
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 16
  },

  text2: {
    backgroundColor: "white",
    paddingVertical: 0,
    borderRadius: 10,
    margin: 5
  },

  text3: {
    display: "none"
  },

  textLabel: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
    marginLeft: "10%",
    marginBottom: "3%",
    backgroundColor: "#0c6efc",
  },
  loginText: {
    color: "white"
  },
  datePickerStyle: {
    // width: 230,
    width: "100%",
  },

});

export default SymptosForm;
