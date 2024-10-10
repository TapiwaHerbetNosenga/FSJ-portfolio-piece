import { getFirestore, collection, query, where, orderBy, limit, startAfter, getDocs, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../firebaseConfig'; // Adjust the path if needed

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const fetchProducts = async (page = 1, search = '', category = '', sortBy = '', order = 'asc') => {
  try {
    let productsQuery = collection(db, 'products');

    if (search) {
      productsQuery = query(productsQuery, where('title', '>=', search), where('title', '<=', search + '\uf8ff'));
    }

    if (category) {
      productsQuery = query(productsQuery, where('category', '==', category));
    }

    if (sortBy) {
      productsQuery = query(productsQuery, orderBy(sortBy, order));
    }

    productsQuery = query(productsQuery, limit(20), startAfter((page - 1) * 20));

    const querySnapshot = await getDocs(productsQuery);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return products;
  } catch (err) {
    throw new Error("Failed to fetch products: " + err.message);
  }
};

export const fetchProductById = async (id) => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Product not found");
    }

    return { id: docSnap.id, ...docSnap.data() };
  } catch (err) {
    throw new Error("Failed to fetch product: " + err.message);
  }
};
