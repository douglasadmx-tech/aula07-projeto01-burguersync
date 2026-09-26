// =============================================================================
// BurguerSync Ourinhos - Firebase Configuration & Resilient Data Layer
// Layer 3: Execução e Conectividade Cloud com Firestore v10 (ES Modules)
// =============================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy,
  enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Credenciais do Projeto BurguerSync Ourinhos
export const firebaseConfig = {
  apiKey: "AIzaSyCgYjWUf5FAkB9kbqmBuTz6xt-DDXfG0fE",
  authDomain: "burguesync123.firebaseapp.com",
  projectId: "burguesync123",
  storageBucket: "burguesync123.firebasestorage.app",
  messagingSenderId: "200958802667",
  appId: "1:200958802667:web:f7531648f64cc855e21cae"
};

let app = null;
let db = null;
let isOfflineFallback = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  // Tentativa de habilitar persistência offline via IndexedDB
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('[Firestore] Multi-tabs abertas, persistência habilitada apenas na 1ª aba.');
    } else if (err.code === 'unimplemented') {
      console.warn('[Firestore] Navegador atual não suporta persistência IndexedDB.');
    }
  });

  console.log('[Firestore] Conectado com sucesso ao banco de dados burguesync123.');
} catch (error) {
  console.error('[Firestore] Erro ao inicializar SDK Firebase:', error);
  isOfflineFallback = true;
}

export { 
  app, 
  db, 
  collection, 
  addDoc, 
  onSnapshot, 
  updateDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy,
  isOfflineFallback 
};
