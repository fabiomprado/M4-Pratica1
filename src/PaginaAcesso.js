import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const PaginaAcesso = ({ navigation }) => {
  const handlePressEntrar = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Bem-vindo à</Text>
        <Image source={require('./logo/Meeting.png')} style={styles.logo} />
        <TouchableOpacity style={styles.botao} onPress={handlePressEntrar}>
          <Text style={styles.textoBotao}>Acessar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textoAbaixo}>Made by: Fabio Prado</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  botao: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textoAbaixo: {
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default PaginaAcesso;
