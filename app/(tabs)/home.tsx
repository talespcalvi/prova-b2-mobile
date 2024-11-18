import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabase'; 

const Home = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut(); 
      if (error) {
        console.error('Erro ao deslogar:', error.message);
        return;
      }
      router.push('/login'); 
    } catch (error) {
      console.error('Erro inesperado ao deslogar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Você logou!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', 
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
    marginBottom: 20,
  },
  logoutButton: {
    height: 45,
    width: '50%',
    maxWidth: 200,
    backgroundColor: '#d9534f', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
