/* eslint-disable global-require */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert } from 'react-native';

export default class HomeScreen extends Component {

  static navigationOptions = {
    header: null //Esconder Header
  }

  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch('http://18.221.183.124/blog/public/api/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          refreshing: false,
        }, () => {
          console.log(this.state.dataSource);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    return fetch('http://18.221.183.124/blog/public/api/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          refreshing: false,
          dataSource: responseJson,
        }, () => {
          console.log(this.state.dataSource);
        });
      })
      .catch((error) => {
        Alert.alert('Erro', 'Erro ao tentar listar os itens.');
        console.error(error);
        this.setState({
          refreshing: false
        });
      });
  }

  FlatListItemSeparator() {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: 'deeppink',
          marginHorizontal: 3,
        }}
      />
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            />
          }
        >
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => 
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditPost',
                { onRefresh: this.onRefresh,
                 item_id: item.id,
                 item_title: item.title,
                 item_description: item.description
                })}
              style={styles.item}
            >
              <Text
                style={styles.item_text} 
              > {item.title} </Text>
              <Image
               source={require('../imgs/right-arrow.png')}
               style={styles.item_image}
              />
            </TouchableOpacity>}
            // eslint-disable-next-line no-unused-vars
            keyExtractor={({ id }, index) => id.toString()}
          />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.footer_button}
            onPress={() => this.props.navigation.navigate('NewPost', { onRefresh: this.onRefresh })}
          >
            <Image
             style={styles.footer_button_image}
             source={require('../imgs/plus-circular.png')}
            />
            <Text style={styles.footer_button_text}>Novo post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 22,
    backgroundColor: 'deeppink'
   },
   item: {
     flexDirection: 'row',
     alignItems: 'center',
     flex: 1,
     backgroundColor: 'white',
     padding: 10,
     marginHorizontal: 4,
     borderRadius: 2,
     height: 44,
     justifyContent: 'space-between'
   },
   item_image: {
     height: 20,
     width: 20
   },
   item_text: {
     fontSize: 18,
     color: 'black',
     fontWeight: 'bold'
   },
   footer: {
     backgroundColor: 'white',
     height: 70
   },
   footer_button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1
   },
   footer_button_image: {
     height: 34,
     width: 34,
     marginTop: 4
   },
   footer_button_text: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center'
  },
});
