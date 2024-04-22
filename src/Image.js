import React from 'react';
import { View, Image } from 'react-native';

const Imagens = () => {
  return (
    <View>
      <Image 
        source={require('./logo/fornecedores.png')}
        style={{ width: 100, height: 100 }}
      />
      {/* Adicione mais lógica conforme necessário */}
    </View>
  );
};

export default Imagens;
