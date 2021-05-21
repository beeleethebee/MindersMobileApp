import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "assets/styles/styleActivityPage.js";

export default function Activity({ navigation }) {
  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
    >
      <View style={styles.activityCardWrapper}>
        <View style={styles.timeLineHeader}>
          <Text style={styles.timeLineTitle}>Aujourd'hui</Text>
          <Text style={styles.timeLineTitle}>Tout voir</Text>
        </View>
        <Text>ceci est la page activité</Text>
        <View className="activity-card-wrapper">
          <View className="activity-card">
            <View className="activity-card-circle" />
            <View className="activity-info-wrapper">
              <Text>Ma daronne a pété</Text>
              <Text>à 18h00</Text>
              <Text>#sapu</Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text>LE BAS DE BAGE TA MERE</Text>
      </View>
    </ScrollView>
  );
}
