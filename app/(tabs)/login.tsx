import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabase'; 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>(''); 
  const router = useRouter();

  const handleLogin = async () => {
    setMessage(''); 
    setMessageType('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`Erro de login: ${error.message}`);
        setMessageType('error');
      } else {
        console.log('Login bem-sucedido:', data);
        setMessage('Login realizado com sucesso!');
        setMessageType('success');
        setTimeout(() => router.push('/home'), 2000); 
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      setMessage('Erro inesperado. Tente novamente mais tarde.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Faça login!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Mensagem de Feedback */}
      {message ? (
        <Text
          style={[
            styles.feedbackMessage,
            messageType === 'error' ? styles.errorText : styles.successText,
          ]}
        >
          {message}
        </Text>
      ) : null}

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => router.push('/signUp')}>
          <Text style={styles.linkText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#121212', 
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#fff', 
  },
  input: {
    height: 50,
    width: '90%',
    maxWidth: 400,
    borderColor: '#444', 
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#fff', 
    backgroundColor: '#1e1e1e', 
  },
  loginButton: {
    height: 50,
    width: '40%',
    maxWidth: 400,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    color: '#f44336',
  },
  successText: {
    color: '#28a745', 
  },
  linkContainer: {
    width: '90%',
    maxWidth: 400,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#1e90ff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
