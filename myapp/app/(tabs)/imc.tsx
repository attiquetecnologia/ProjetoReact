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
  const [peso, setPeso] = useState();
  const [altura, setAltura] = useState();
  const [resultado, setResultado] = useState('');
  const [imc, setIMC] = useState();
  
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
        <ThemedText type="title">Calculo de IMC</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O que é IMC</ThemedText>
        <ThemedText>
        O Índice de Massa Corporal (IMC) é um parâmetro internacional que indica o peso ideal de uma pessoa em relação à sua altura. O IMC é calculado dividindo o peso do indivíduo pela sua altura ao quadrado, em metros. 

        A interpretação do IMC é a seguinte:
        Abaixo de 18,5: baixo peso
        Entre 18,5 e 24,9: peso adequado
        Entre 25,0 e 30,0: sobrepeso
        Acima de 30,0: obesidade 
        O IMC é importante para verificar se o peso está de acordo com a altura, se existe risco de desenvolver doenças e, no caso de crianças, se o desenvolvimento está normal. 
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Calculadora</ThemedText>
        <ThemedText>
            <SafeAreaView>
                <View>
                    <Text>Seu nome</Text>
                    <TextInput 
                        onChangeText={setNome}
                        value={nome}
                        style={styles['form-control']} 
                        placeholder='Seu nome' 
                        keyboardType="text"
                        />
                        

                </View>
                <View>
                    <Text>Altura</Text>
                    <TextInput
                        onChangeText={setAltura}
                        value={altura} 
                        style={styles['form-control']} 
                        placeholder='Altura' 
                        keyboardType="numeric"
                        />
                </View>
                <View>
                    <Text>Peso</Text>
                    <TextInput
                        onChangeText={setPeso}
                        value={peso} 
                        style={styles['form-control']} 
                        placeholder='Peso'
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
