
import { 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./auth";

const ORG_PROFILE_DOC_ID = "main_profile";
const ORG_COLLECTION = "organization";
const DEPARTMENTS_COLLECTION = "departments";
const LOCATIONS_COLLECTION = "locations";

// Organization Profile
export const getOrganizationProfile = async () => {
    const docRef = doc(db, ORG_COLLECTION, ORG_PROFILE_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // Return a default object if it doesn't exist
        return { name: 'HRM Simplified', address: '123 Main Street, Anytown, USA', contactInfo: 'contact@hrmsimplified.com', logoUrl: "https://picsum.photos/seed/logo/100/100" };
    }
};

export const updateOrganizationProfile = async (profileData: any) => {
    const docRef = doc(db, ORG_COLLECTION, ORG_PROFILE_DOC_ID);
    await setDoc(docRef, profileData, { merge: true });
};

export const uploadCompanyLogo = async (file: File) => {
    const storageRef = ref(storage, `company/logo/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
};

// Departments
export const getDepartments = async () => {
    const querySnapshot = await getDocs(collection(db, DEPARTMENTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addDepartment = async (department: { name: string }) => {
    await addDoc(collection(db, DEPARTMENTS_COLLECTION), department);
};

export const updateDepartment = async (id: string, department: { name: string }) => {
    const docRef = doc(db, DEPARTMENTS_COLLECTION, id);
    await updateDoc(docRef, department);
};

export const deleteDepartment = async (id: string) => {
    const docRef = doc(db, DEPARTMENTS_COLLECTION, id);
    await deleteDoc(docRef);
};

// Locations
export const getLocations = async () => {
    const querySnapshot = await getDocs(collection(db, LOCATIONS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addLocation = async (location: { name: string }) => {
    await addDoc(collection(db, LOCATIONS_COLLECTION), location);
};

export const updateLocation = async (id: string, location: { name: string }) => {
    const docRef = doc(db, LOCATIONS_COLLECTION, id);
    await updateDoc(docRef, location);
};

export const deleteLocation = async (id: string) => {
    const docRef = doc(db, LOCATIONS_COLLECTION, id);
    await deleteDoc(docRef);
};
