import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabase'; 

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); 
  const [messageType, setMessageType] = useState<'error' | 'success' | ''>(''); 
  const router = useRouter();

  const handleSignUp = async () => {
    setMessage(''); 
    setMessageType('');

    if (!name || !email || !password || !confirmPassword) {
      setMessage('Por favor, preencha todos os campos.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem!');
      setMessageType('error');
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setMessage(`Erro no cadastro: ${authError.message}`);
        setMessageType('error');
        return;
      }

      const { error: insertError } = await supabase.from('usuarios').insert([
        { nome: name, email },
      ]);

      if (insertError) {
        setMessage(`Erro ao salvar informações: ${insertError.message}`);
        setMessageType('error');
        return;
      }

      setMessage('Cadastro realizado com sucesso!');
      setMessageType('success');
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      console.error('Erro inesperado:', error);
      setMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      {/* Nome */}
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Senha e Confirmação de Senha */}
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmação de Senha"
        placeholderTextColor="#888"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Botão de Cadastro */}
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.signUpButtonText}>{loading ? 'Carregando...' : 'Cadastrar'}</Text>
      </TouchableOpacity>

      {/* Mensagem de Feedback */}
      {message ? (
        <Text style={[styles.feedbackMessage, messageType === 'error' ? styles.errorText : styles.successText]}>
          {message}
        </Text>
      ) : null}

      {/* Link para Login */}
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.backLinkText}>Já possui cadastro?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#121212', 
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff', 
  },
  input: {
    height: 45,
    width: '80%',
    maxWidth: 300,
    borderColor: '#444', 
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#fff',
    backgroundColor: '#1e1e1e', 
  },
  signUpButton: {
    height: 45,
    width: '60%',
    maxWidth: 200,
    backgroundColor: '#28a745', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  signUpButtonText: {
    color: '#fff', 
    fontSize: 16,
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
  backLinkText: {
    color: '#1e90ff', 
    fontSize: 16,
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});
