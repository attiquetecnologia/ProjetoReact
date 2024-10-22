import { Image, StyleSheet, Platform, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IMC() {
  const [nome, setNome] = useState();
  const [idade, setIdade] = useState();
  const [altura, setAltura] = useState();
  const [resultado, setResultado] = useState('');
  const [imc, setIMC] = useState();
  
  const [usuario, setUsuario] = useState({
    nome: '',
    idade: 0,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsuario({ nome: nome, idade: idade });
    try {
      const response = await axios.post('http://127.0.0.1:8000/usuarios/', usuario);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function calcular(){
    setIMC(peso/(altura*altura));
    if (imc<=18.5){
        setResultado(nome+", seu imc é de "+imc+", abaixo do peso!");
    } else if (imc>=18.5 && imc<=24.5) {
        setResultado(nome+", seu imc é de "+imc+", peso está adequado!");
    } else if (imc>=25.5 && imc<30) {
        setResultado(nome+", seu imc é de "+imc+", peso está alto!");
    } else if (imc>=30) {
        setResultado(nome+", seu imc é de "+imc+", está obeso!");
    }

  }
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.reactLogo}
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cadastro de Usuário</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Como cadastrar</ThemedText>
        <ThemedText>
        
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
            <SafeAreaView>
                <View>
                    <Text>Nome</Text>
                    <TextInput 
                        onChangeText={setNome}
                        value={nome}
                        style={styles['form-control']} 
                        placeholder='Seu nome' 
                        keyboardType="text"
                        />
                        

                </View>
                <View>
                    <Text>Idade</Text>
                    <TextInput
                        onChangeText={setAltura}
                        value={altura} 
                        style={styles['form-control']} 
                        placeholder='Altura' 
                        keyboardType="numeric"
                        />
                </View>
                
                <View>
                    <Button onPress={calcular} title="Calcular"></Button>
                </View>
                <View id='resultado'>
                    {resultado}
                </View>
            </SafeAreaView>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  "form-control": {
        border: "solid 1px",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
});
