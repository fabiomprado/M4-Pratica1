import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaAcesso from './PaginaAcesso';
import CadastroCliente from './CadastroCliente';
import ListagemClientes from './ListagemClientes';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao obter clientes:', error);
    }
  };

  const handleCadastrarCliente = async (cliente) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });

      const data = await response.json();
      setClientes([...clientes, data]);
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const handleExcluirCliente = async (clienteId) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/clientes/${clienteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setClientes(clientes.filter((cliente) => cliente.id !== clienteId));
      } else {
        Alert.alert('Erro', 'Erro ao excluir cliente.');
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  return (
    <View style={styles.container}>
      <CadastroCliente onCadastrar={handleCadastrarCliente} />
      <ListagemClientes clientes={clientes} onExcluirCliente={handleExcluirCliente} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PaginaAcesso" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PaginaAcesso" component={PaginaAcesso} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;
