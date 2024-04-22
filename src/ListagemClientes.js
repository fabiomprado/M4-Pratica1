import React from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import Imagens from './Image'; // Verifique se o caminho do arquivo está correto

const ListagemClientes = ({ clientes, onExcluirCliente }) => {
    const handleExcluirCliente = (clienteId) => {
        Alert.alert(
            'Confirmação',
            'Deseja realmente excluir este cliente?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    onPress: () => {
                        onExcluirCliente && onExcluirCliente(clienteId);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={clientes || []}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => (
                    <View key={item.id} style={styles.clienteItem}>
                        <View style={styles.imagemContainer}>
                            <Imagens />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.endereco}>{item.endereco}</Text>
                            <Text style={styles.contato}>{item.contato}</Text>
                            <Text style={styles.email}>{item.email}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.botaoExcluir}
                            onPress={() => handleExcluirCliente(item.id)}
                        >
                            <Text style={styles.textoBotao}>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    clienteItem: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imagemContainer: {
        alignSelf: 'center',
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    nome: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    endereco: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    contato: {
        fontSize: 18,
    },
    email: {
        fontSize: 18,
    },
    botaoExcluir: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
    },
    textoBotao: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ListagemClientes;
