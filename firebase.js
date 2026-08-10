// ======================================================
// EL PATRÓN DE LAS OFERTAS
// firebase.js
// ======================================================

// Firebase v11+

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  increment,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";


// ======================================================
// FIREBASE CONFIG
// REEMPLAZAR POR TU CONFIGURACIÓN
// ======================================================

const firebaseConfig = {

  apiKey: "PEGA_AQUI_TU_API_KEY",

  authDomain: "TU_PROYECTO.firebaseapp.com",

  projectId: "TU_PROYECTO",

  storageBucket: "TU_PROYECTO.appspot.com",

  messagingSenderId: "000000000000",

  appId: "1:000000000:web:xxxxxxxxxxxx"

};


// ======================================================
// INIT APP
// ======================================================

const app = initializeApp(firebaseConfig);


// ======================================================
// AUTH
// ======================================================

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


// ======================================================
// FIRESTORE
// ======================================================

const db = getFirestore(app);


// ======================================================
// STORAGE
// ======================================================

const storage = getStorage(app);


// ======================================================
// COLECCIONES
// ======================================================

export const COLLECTIONS = {

  usuarios: "usuarios",

  cupones: "cupones",

  cuponesLinks: "cupones_links",

  ofertas: "ofertas",

  banner: "banner",

  estadisticas: "estadisticas",

  estadisticasDiarias: "estadisticas_diarias",

  copias: "copias",

  clics: "clics",

  regiones: "regiones",

  configuracion: "configuracion",

  imagenes: "imagenes"

};


// ======================================================
// AUTH HELPERS
// ======================================================

export async function loginGoogle() {

  try {

    const result =
      await signInWithPopup(auth, googleProvider);

    return result.user;

  } catch (error) {

    console.error(
      "Error login Google",
      error
    );

    throw error;

  }

}


export async function logoutUser() {

  try {

    await signOut(auth);

  } catch (error) {

    console.error(
      "Error logout",
      error
    );

  }

}


export function watchAuth(callback) {

  return onAuthStateChanged(
    auth,
    callback
  );

}


// ======================================================
// USUARIOS
// ======================================================

export async function createUserDocument(user) {

  const userRef = doc(
    db,
    COLLECTIONS.usuarios,
    user.uid
  );

  const snapshot =
    await getDoc(userRef);

  if (snapshot.exists()) return;

  await setDoc(userRef, {

    uid: user.uid,

    nombre:
      user.displayName || "",

    email:
      user.email || "",

    foto:
      user.photoURL || "",

    nivel: "BASICO",

    visitas: 0,

    copias: 0,

    ahorro: 0,

    premios: 0,

    estado: "",

    admin: false,

    fechaRegistro:
      serverTimestamp()

  });

}


export async function getUser(uid) {

  const snap = await getDoc(
    doc(
      db,
      COLLECTIONS.usuarios,
      uid
    )
  );

  return snap.exists()
    ? snap.data()
    : null;

}


// ======================================================
// BANNER
// ======================================================

export async function getBannerConfig() {

  try {

    const bannerRef =
      doc(
        db,
        COLLECTIONS.banner,
        "principal"
      );

    const bannerDoc =
      await getDoc(bannerRef);

    if (!bannerDoc.exists())
      return null;

    return bannerDoc.data();

  } catch (error) {

    console.error(error);

    return null;

  }

}


// ======================================================
// CUPONES
// ======================================================

export async function getCoupons(type = null) {

  try {

    let q;

    if (type) {

      q = query(
        collection(
          db,
          COLLECTIONS.cupones
        ),
        where("tipo", "==", type)
      );

    } else {

      q = query(
        collection(
          db,
          COLLECTIONS.cupones
        )
      );

    }

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  } catch (error) {

    console.error(error);

    return [];

  }

}


// ======================================================
// OFERTAS
// ======================================================

export async function getOffers() {

  try {

    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTIONS.ofertas
        )
      );

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  } catch (error) {

    console.error(error);

    return [];

  }

}


// ======================================================
// ESTADÍSTICAS
// ======================================================

export async function registerCouponCopy(
  couponId,
  codigo,
  ahorro = 0
) {

  try {

    await addDoc(
      collection(
        db,
        COLLECTIONS.copias
      ),
      {

        couponId,

        codigo,

        ahorro,

        fecha:
          serverTimestamp()

      }
    );

    await updateDoc(
      doc(
        db,
        COLLECTIONS.cupones,
        couponId
      ),
      {
        copias:
          increment(1)
      }
    );

  } catch (error) {

    console.error(error);

  }

}


export async function registerCouponClick(
  couponId
) {

  try {

    await addDoc(
      collection(
        db,
        COLLECTIONS.clics
      ),
      {

        couponId,

        fecha:
          serverTimestamp()

      }
    );

    await updateDoc(
      doc(
        db,
        COLLECTIONS.cupones,
        couponId
      ),
      {
        clics:
          increment(1)
      }
    );

  } catch (error) {

    console.error(error);

  }

}


export async function registerOfferClick(
  offerId
) {

  try {

    await updateDoc(
      doc(
        db,
        COLLECTIONS.ofertas,
        offerId
      ),
      {
        clics:
          increment(1)
      }
    );

  } catch (error) {

    console.error(error);

  }

}


// ======================================================
// STORAGE
// ======================================================

export async function uploadImage(
  file,
  folder = "imagenes"
) {

  try {

    const fileName =
      `${Date.now()}_${file.name}`;

    const storageRef =
      ref(
        storage,
        `${folder}/${fileName}`
      );

    await uploadBytes(
      storageRef,
      file
    );

    return await getDownloadURL(
      storageRef
    );

  } catch (error) {

    console.error(error);

    throw error;

  }

}


// ======================================================
// REALTIME LISTENER
// ======================================================

export function watchCollection(
  collectionName,
  callback
) {

  return onSnapshot(

    collection(
      db,
      collectionName
    ),

    snapshot => {

      const data =
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

      callback(data);

    }

  );

}


// ======================================================
// EXPORTS
// ======================================================

export {

  app,

  auth,

  db,

  storage,

  serverTimestamp,

  increment,

  collection,

  doc,

  addDoc,

  setDoc,

  updateDoc,

  deleteDoc,

  getDoc,

  getDocs,

  query,

  where,

  orderBy,

  limit

};