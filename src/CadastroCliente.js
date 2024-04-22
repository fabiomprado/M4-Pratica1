import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const CadastroCliente = ({ onCadastrar }) => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  const handleCadastrar = () => {
    if (!nome || !endereco || !contato || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const cliente = {
      nome,
      endereco,
      contato,
      email,
      imagemUrl,
    };

    onCadastrar(cliente);

    setNome('');
    setEndereco('');
    setContato('');
    setEmail('');
    setImagemUrl('');
  };

  const handleSelecionarImagem = () => {
    const options = {
      title: 'Selecione uma Imagem',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Seleção de imagem cancelada');
      } else if (response.error) {
        console.log('Erro ao selecionar imagem:', response.error);
      } else {
        setImagemUrl(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {imagemUrl && <Image source={{ uri: imagemUrl }} style={styles.imagemPreview} />}
      <TouchableOpacity style={styles.botaoImagem} onPress={handleSelecionarImagem}>
        <Text style={styles.textoBotao}>Selecionar Imagem</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nome do Fornecedor"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Contato"
        value={contato}
        onChangeText={setContato}
      />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TouchableOpacity style={styles.botaoCadastrar} onPress={handleCadastrar}>
        <Text style={styles.textoBotao}>Cadastrar Fornecedor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  imagemPreview: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  botaoImagem: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  botaoCadastrar: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
  },
  textoBotao: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CadastroCliente;
