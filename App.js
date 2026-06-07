import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [cep, setCep] = useState('');
  const [loading, setLoading] = useState(false);
  const [endereco, setEndereco] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');

  const buscarEndereco = async () => {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      setMensagemErro('CEP invalido. Digite exatamente 8 numeros.');
      setEndereco(null);
      Alert.alert('CEP invalido', 'Digite um CEP com 8 numeros.');
      return;
    }

    try {
      setMensagemErro('');
      setLoading(true);
      setEndereco(null);

      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

      if (!resposta.ok) {
        throw new Error('Falha na requisicao HTTP.');
      }

      const dados = await resposta.json();

      if (dados.erro) {
        setMensagemErro('CEP nao encontrado. Tente outro CEP valido.');
        Alert.alert('Nao encontrado', 'Nenhum endereco encontrado para esse CEP.');
        return;
      }

      setEndereco(dados);
    } catch (erro) {
      Alert.alert('Erro', 'Nao foi possivel consultar a API no momento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>Consulta de Endereco por CEP</Text>
        <Text style={styles.subtitulo}>Exemplo de consumo de API com fetch no React Native</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Digite o CEP:</Text>
          <TextInput
            value={cep}
            onChangeText={(texto) => {
              setCep(texto);
              if (mensagemErro) {
                setMensagemErro('');
              }
            }}
            placeholder="Ex.: 01001000"
            keyboardType="numeric"
            maxLength={9}
            style={styles.input}
          />

          {!!mensagemErro && (
            <View style={styles.erroBox}>
              <Text style={styles.erroTexto}>{mensagemErro}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.botao} onPress={buscarEndereco}>
            <Text style={styles.botaoTexto}>Buscar endereco</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0b5cff" />
            <Text style={styles.loadingText}>Consultando API...</Text>
          </View>
        )}

        {endereco && !loading && (
          <View style={styles.resultadoCard}>
            <Text style={styles.resultadoTitulo}>Resultado da API</Text>
            <Text style={styles.linha}><Text style={styles.chave}>CEP:</Text> {endereco.cep}</Text>
            <Text style={styles.linha}><Text style={styles.chave}>Logradouro:</Text> {endereco.logradouro || 'Nao informado'}</Text>
            <Text style={styles.linha}><Text style={styles.chave}>Bairro:</Text> {endereco.bairro || 'Nao informado'}</Text>
            <Text style={styles.linha}><Text style={styles.chave}>Cidade:</Text> {endereco.localidade}</Text>
            <Text style={styles.linha}><Text style={styles.chave}>UF:</Text> {endereco.uf}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5ff',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1d2a57',
  },
  subtitulo: {
    fontSize: 14,
    color: '#37456f',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#00104d',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#24325e',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cad3f3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9fbff',
    marginBottom: 12,
  },
  erroBox: {
    backgroundColor: '#fdeaea',
    borderWidth: 1,
    borderColor: '#f5b6b6',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  erroTexto: {
    color: '#9e1f1f',
    fontSize: 13,
    fontWeight: '600',
  },
  botao: {
    backgroundColor: '#0b5cff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  loadingBox: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loadingText: {
    color: '#30406d',
  },
  resultadoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d4dcf8',
  },
  resultadoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1d2a57',
  },
  linha: {
    fontSize: 15,
    marginBottom: 6,
    color: '#1f2e55',
  },
  chave: {
    fontWeight: '700',
  },
});
