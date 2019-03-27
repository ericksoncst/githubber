import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import api from "../../services/api";
import styles from "./styles";
import Proptypes from "prop-types";

export default class Welcome extends Component {
  static proptypes = {
    navigation: Proptypes.shape({
      navigate: Proptypes.func,
    }).isRequired,
  };

  state = {
    username: "",
    loading: false,
    error: false,
  };

  checkUserExists = async username => {
    const user = await api.get(`/users/${username}`);

    return user;
  };

  saveUser = async username => {
    await AsyncStorage.setItem("@Githubber:username", username);
  };

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate("User");
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { username, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>
          Para que possamos continuar,precisamos que você informe seu usuário no
          github.
        </Text>

        {error && <Text style={styles.error}>Usuário inexistente!</Text>}

        <View style={styles.form}>
          <TextInput
            value={username}
            onChangeText={text => this.setState({ username: text })}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity style={styles.button} onPress={() => this.signIn()}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Prosseguir</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
