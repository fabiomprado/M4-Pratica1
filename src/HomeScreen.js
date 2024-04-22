import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CadastroCliente from './CadastroCliente';
import ListagemClientes from './ListagemClientes';
import * as SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'clientes.db', createFromLocation: '~clientes.db' });

const HomeScreen = ({ navigation }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Carregar clientes do banco de dados ao inicializar o componente
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM clientes',
        [],
        (_, { rows }) => {
          const clientesArray = rows._array || [];
          setClientes(clientesArray);
        },
        (_, error) => {
          console.error('Erro ao obter clientes:', error);
        }
      );
    });
  };

  const handleCadastrarCliente = (cliente) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO clientes (nome, endereco, contato, email, imagemUrl) VALUES (?, ?, ?, ?, ?)',
        [cliente.nome, cliente.endereco, cliente.contato, cliente.email, cliente.imagemUrl],
        (_, result) => {
          const novoCliente = {
            id: result.insertId,
            ...cliente,
          };
          setClientes([...clientes, novoCliente]);
        },
        (_, error) => {
          console.error('Erro ao cadastrar cliente:', error);
        }
      );
    });
  };

  const handleExcluirCliente = async (clienteId) => {
    try {
      await new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM clientes WHERE id = ?',
            [clienteId],
            (_, result) => {
              if (result.rowsAffected > 0) {
                resolve();
              } else {
                reject('Cliente não encontrado');
              }
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });

      // Recarregar a lista após a exclusão
      fetchClientes();
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      Alert.alert('Erro', 'Erro ao excluir cliente.');
    }
  };

  return (
    <View style={styles.container}>
      <CadastroCliente onCadastrar={handleCadastrarCliente} />
      <ListagemClientes clientes={clientes} onExcluirCliente={handleExcluirCliente} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default HomeScreen;
