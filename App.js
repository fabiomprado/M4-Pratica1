import React from 'react';
import { View } from 'react-native';
import CadastroFornecedor from './CadastroFornecedor';
import ListagemFornecedores from './ListagemFornecedores';
import AssociacaoImagens from './AssociacaoImagens';

const App = () => {
  return (
    <View>
      {/* Renderize os componentes conforme necessário */}
      <CadastroFornecedor />
      <ListagemFornecedores />
      <AssociacaoImagens />
    </View>
  );
};

export default App;
