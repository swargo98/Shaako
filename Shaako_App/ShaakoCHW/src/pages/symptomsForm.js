// import component
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Navbar from '../../components/Navbar';

const items = [{
    id: '92iijs7yta',
    name: 'Ondo'
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
  }, {
    id: '16hbajsabsd',
    name: 'Calabar'
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos'
  }, {
    id: '667atsas',
    name: 'Maiduguri'
  }, {
    id: 'hsyasajs',
    name: 'Anambra'
  }, {
    id: 'djsjudksjd',
    name: 'Benue'
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
  }, {
    id: 'suudydjsjd',
    name: 'Abuja'
    }
];

class SymptosForm extends Component {

  state = {
    selectedItems : []
  };

  
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;

    return (
      <View style={styles.container}>
      <Navbar></Navbar>
      <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>Symptoms Form</Text>
                        </View>
      <View style={{margin: 10}}>
            <Text style={styles.text}>   Patient Name: </Text>
            <Text style={styles.text}>   Date: </Text>
        </View>
        <View>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText=" লক্ষণ সিলেক্ট করুন"
          searchInputPlaceholderText="লক্ষণ খুঁজুন"
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: "#000"}}
          styleMainWrapper={{ padding: 10 }}
          tagContainerStyle={{ backgroundColor:"#000" }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        <View style={{ flex: 1, margin: 10 }}>
          {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
        backgroundColor : "#2089dc",
        color : "white",
        // textAlign : "center",
        paddingVertical : 5,
        marginBottom : 10,
        borderRadius: 10
    }

});

export default SymptosForm;
