import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity } from 'react-native';

import Contato from './components/Contato';

export default function App() {

  let nomeInput;
  let telefoneInput;

  const textInputNome = React.createRef();
  const textInputTelefone = React.createRef();

  const [contatos, setContatos] = useState([]);
  const [contadorContatos, setContadorContatos] = useState(10);

  const capturarNome= (nome) => {
    nomeInput = nome;
  };

  const capturarTelefone = (tel) => {
    telefoneInput = tel;
  };

  const adicionarContato = (nome, telefone) => {
    const contato = new Contato();

    contato.nome = nome;
    contato.telefone = telefone;

    if(contato.nome && contato.telefone){
      setContatos(contatos => {
        setContadorContatos(contadorContatos + 2);
        return [...contatos, {key: contadorContatos.toString(), value:contato}]
      });

      limparDados();
    }
  }

  const limparDados = () => {
    textInputNome.current.clear();
    textInputTelefone.current.clear();
  };

  const removerContato = (keyASerRemovida) => {
    setLembretes(lembretes => {
      return lembretes.filter((lembrete) => {
        return lembrete.key !== keyASerRemovida
      })
    });
  }

  return (
    <View style={estilos.telaPrincipalView}>
      <View style={estilos.lembreteView}>
            <TextInput
                ref={textInputNome}
                placeholder="Nome"
                style={estilos.lembreteTextInput}
                onChangeText = {capturarNome}
                value={nomeInput}
            />
            <TextInput
                ref={textInputTelefone}
                placeholder="Telefone"
                style={estilos.lembreteTextInput}
                onChangeText = {capturarTelefone}
                value={telefoneInput}
            />
            <Button
                title="Adicionar"
                onPress={() => adicionarContato(nomeInput, telefoneInput)}
            />
        </View>
        <FlatList 
          data={contatos}
          renderItem={
            (contato) => (
              <TouchableOpacity onLongPress={() => removerContato(contato.chave)}>
                <View style={estilos.itemNaLista}> 
                    <Text>Id: {contato.item.key}</Text>
                    <Text>Nome: {contato.item.value.nome}</Text>
                    <Text>Telefone: {contato.item.value.telefone}</Text>
                </View>
              </TouchableOpacity>
            )
          }
        />
      </View>

  );
}

const estilos = StyleSheet.create({
  entradaView:{
    marginBottom: 8
  },

  itemNaListaView:{
    padding: 12,
    backgroundColor: '#DDD',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8,
  },  
  
  telaPrincipalView: {
    padding: 50
  },

  lembreteTextInput: {
    borderBottomColor: 'black', 
    borderBottomWidth: 1, 
    marginBottom: 4, 
    padding: 12,
    textAlign: 'center'
  },

  lembreteView:{
    marginBottom: 8,
  },

  lembreteTextInput:{
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      padding: 8,
      marginBottom: 8,
      textAlign: 'center'
  },

  itemNaLista:{
    padding: 12,
    backgroundColor: '#CCC',
    borderBottonColor: '#000',
    borderWidth: 1,
    marginBottom: 8,
    borderRadius: 8
}  
});
