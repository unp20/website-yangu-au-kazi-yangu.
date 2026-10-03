/* ==========================================
   UNP TOURS - AUTH.JS
   Kuingia, kujisajili, na kutoka
   ========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    updateProfile 
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2YtPFL2L_ZwAKdSYpXtvLt8gJUm2IX6s",
    authDomain: "unptours.firebaseapp.com",
    projectId: "unptours",
    storageBucket: "unptours.firebasestorage.app",
    messagingSenderId: "233326851661",
    appId: "1:233326851661:web:354156110a5cee29904e04"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ==========================================
// 1. KUJISAJILI (SIGNUP)
// ==========================================
window.unpSignup = async function(name, email, password, phone) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile
        await updateProfile(user, { displayName: name });

        // Save to Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            phone: phone || '',
            tier: 'Silver',
            createdAt: new Date()
        });

        return { success: true, user: user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ==========================================
// 2. KUINGIA (LOGIN)
// ==========================================
window.unpLogin = async function(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ==========================================
// 3. KUTOKA (LOGOUT)
// ==========================================
window.unpLogout = async function() {
    try {
        await signOut(auth);
        window.location.href = 'index.html';
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ==========================================
// 4. ANGALIA MTUMIAJI (AUTH STATE)
// ==========================================
window.unpAuthState = function(callback) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                callback({ loggedIn: true, user: user, data: docSnap.data() });
            } else {
                callback({ loggedIn: true, user: user, data: null });
            }
        } else {
            callback({ loggedIn: false, user: null, data: null });
        }
    });
};

// ==========================================
// 5. KUPATA TAARIFA ZA MTUMIAJI
// ==========================================
window.unpGetUser = async function(uid) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { success: true, data: docSnap.data() };
        } else {
            return { success: false, error: 'Mtumiaji haipatikani.' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ==========================================
// 6. KUANDAA AUTH KWA KURASA
// ==========================================
window.unpRequireLogin = function() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            window.location.href = 'login.html';
        }
    });
};

console.log('✅ UNP TOURS Auth.js imepakiwa');
