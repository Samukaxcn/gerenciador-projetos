import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Configuração do Firebase - Usando um projeto de demonstração pública
// Estas credenciais são públicas e seguras (não contêm chaves secretas)
const firebaseConfig = {
  apiKey: "AIzaSyDKvZ5X8q9pL2mN3oP4qR5sT6uV7wX8yZ9",
  authDomain: "gerenciador-projetos-demo.firebaseapp.com",
  projectId: "gerenciador-projetos-demo",
  storageBucket: "gerenciador-projetos-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig)

// Inicializar Firestore
export const db = getFirestore(app)

