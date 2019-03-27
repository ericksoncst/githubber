import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Proptypes from "prop-types";

import styles from "./styles";

const RepositoryItem = ({ repository }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{repository.full_name}</Text>
    <View style={styles.infoContainer}>
      <View style={styles.info}>
        <Icon name="star" size={12} style={styles.infoIcon} />
        <Text style={styles.infoText}>{repository.stargazers_count}</Text>
      </View>
      <View style={styles.info}>
        <Icon name="code-fork" size={12} style={styles.infoIcon} />
        <Text style={styles.infoText}>{repository.forks_count}</Text>
      </View>
      <View style={styles.info}>
        <Icon name="eye" size={12} style={styles.infoIcon} />
        <Text style={styles.infoText}>{repository.watchers_count}</Text>
      </View>
    </View>
  </View>
);

RepositoryItem.propTypes = {
  repository: Proptypes.shape({
    full_name: Proptypes.string,
    stargazers_count: Proptypes.number,
    forks_count: Proptypes.number,
    watchers_count: Proptypes.number,
  }).isRequired,
};

export default RepositoryItem;
