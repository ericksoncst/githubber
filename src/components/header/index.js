import React, { Component } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { withNavigation } from "react-navigation";
import Proptypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

import Icon from "react-native-vector-icons/FontAwesome";

class Header extends Component {
  static proptypes = {
    title: Proptypes.string.isRequired,
    navigation: Proptypes.shape({
      navigate: Proptypes.func,
    }).isRequired,
  };

  singOut = async () => {
    const { navigation } = this.props;

    await AsyncStorage.clear();

    navigation.navigate("Welcome");
  };

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.left} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => this.singOut()}>
          <Icon name="exchange" size={16} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Header);
