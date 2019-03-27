import React, { Component } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import Header from "../../components/header";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../../services/api";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";
import RepositoryItem from "./RepositoryItem";

export default class Repositories extends Component {
  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  renderItem = ({ item }) => <RepositoryItem repository={item} />;

  loadRepositories = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem("@Githubber:username");
    const { data } = await api.get(`/users/${username}/repos`);
    this.setState({ data, loading: false, refreshing: false });
  };

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <View>
        <Header title="Repositorios" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

Repositories.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list-alt" size={20} color={tintColor} />
  ),
};
