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
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const url = 'http://18.221.183.124/blog/public/api/posts';

export default class HomeScreen extends Component {

  static navigationOptions = {
    //Setting the header of the screen
    title: 'Novo item',
    headerTintColor: 'deeppink'
  };

  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        titulo: '',
        descricao: '',
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  Postar = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.titulo,
        description: this.state.descricao,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, () => {
        Alert.alert('Sucesso', 'Postagem feita com sucesso');
        this.props.navigation.state.params.onRefresh();
        this.props.navigation.goBack();
      });
    })
    .catch((error) => {
      Alert.alert('Erro', 'A postagem não ocorreu devido a um erro.');
      console.error(error);
    });
  };

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
        <View style={styles.content}>
            <Text style={styles.label}>Título</Text>
            <TextInput
             style={styles.input}
             onChangeText={(text) => this.setState({ titulo: text })}
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput
             style={[styles.input, styles.descriptionInput]}
             multiline
             onChangeText={(text) => this.setState({ descricao: text })}
            />
        </View>
        <TouchableOpacity
         style={styles.item}
         onPress={this.Postar}
        >
            <Image
             source={require('../imgs/confirm.png')}
             style={styles.itemImage}
            />
            <Text style={styles.itemText}>Publicar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10
   },
   content: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: 'white'
   },
   label: {
    fontSize: 22,
    color: 'deeppink'
   },
   input: {
    borderWidth: 1,
    borderRadius: 7,
    alignSelf: 'stretch',
    margin: 15,
    marginTop: 5,
   },
   descriptionInput: {
       flex: 1,
       marginBottom: 30,
       textAlignVertical: 'top'
   },
   item: {
    backgroundColor: 'blue',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
   },
   itemText: {
       fontSize: 20,
       color: 'white',
       textAlign: 'left'
   },
   itemImage: {
     height: 30,
     width: 30,
     marginRight: 20
   }
});
