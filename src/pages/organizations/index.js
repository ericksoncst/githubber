import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import Header from "../../components/header";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../../services/api";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import OrganizationItem from "./OrganizationItem";

export default class Organizations extends Component {
  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadOrganizations();
  }

  renderItem = ({ item }) => <OrganizationItem organization={item} />;

  loadOrganizations = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem("@Githubber:username");
    const { data } = await api.get(`/users/${username}/orgs`);
    this.setState({ data, loading: false, refreshing: false });
  };

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderItem}
        numColumns={2}
        columnWrapperStyle={styles.collumnWrapper}
        onRefresh={this.loadOrganizations}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <View>
        <Header title="Organizações" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

Organizations.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list-alt" size={20} color={tintColor} />
  ),
};
