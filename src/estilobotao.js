<TouchableOpacity
            style={estilos.botao}
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}>
            <Texto style={estilos.textoBotao}>{botaoHomePedidoFeito}</Texto>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.botao, estilos.botaoProdutor]}
            onPress={() => {
              navigation.navigate('Produtor', produtor);
            }}>
            <Texto style={[estilos.textoBotao, estilos.textoBotaoProdutor]}>
              {botaoProdutorPedidoFeito}
            </Texto>
          </TouchableOpacity>