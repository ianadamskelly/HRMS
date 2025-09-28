

import { 
    collection, 
    doc, 
    getDoc, 
    setDoc, 
    getDocs, 
    addDoc,
    updateDoc,
    deleteDoc,
    query,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./auth";

const ORG_COLLECTION = "organization";
const ORG_PROFILE_DOC_ID = "main_profile";
const DEPARTMENTS_COLLECTION = "departments";
const LOCATIONS_COLLECTION = "locations";
const ROLES_COLLECTION = "roles";
const PAY_GRADES_COLLECTION = "payGrades";
const JOB_DESCRIPTIONS_COLLECTION = "jobDescriptions";


export type JobDescription = {
    id: string;
    title: string;
    family: string;
    duties: string;
    qualifications: string;
    salaryRange: string;
    version: string;
    status: "Draft" | "In Review" | "Approved";
};


// Organization Profile
export const getOrganizationProfile = async () => {
    const docRef = doc(db, ORG_COLLECTION, ORG_PROFILE_DOC_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // Return a default object if it doesn't exist
        const defaultProfile = { name: 'HRM Simplified', address: '123 Main Street, Anytown, USA', contactInfo: 'contact@hrmsimplified.com', logoUrl: "https://picsum.photos/seed/logo/100/100" };
        await setDoc(docRef, defaultProfile);
        return defaultProfile;
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
    const q = query(collection(db, DEPARTMENTS_COLLECTION));
    const querySnapshot = await getDocs(q);
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
    const q = query(collection(db, LOCATIONS_COLLECTION));
    const querySnapshot = await getDocs(q);
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

// Roles
export const getRoles = async () => {
    const q = query(collection(db, ROLES_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addRole = async (role: { title: string; description: string; permissions: string[] }) => {
    await addDoc(collection(db, ROLES_COLLECTION), role);
};

export const updateRole = async (id: string, role: { title: string; description: string; permissions: string[] }) => {
    const docRef = doc(db, ROLES_COLLECTION, id);
    await updateDoc(docRef, role);
};

export const deleteRole = async (id: string) => {
    const docRef = doc(db, ROLES_COLLECTION, id);
    await deleteDoc(docRef);
};

// Pay Grades
export const getPayGrades = async () => {
    const q = query(collection(db, PAY_GRADES_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addPayGrade = async (payGrade: { name: string; minSalary: number; midSalary: number; maxSalary: number; }) => {
    await addDoc(collection(db, PAY_GRADES_COLLECTION), payGrade);
};

export const updatePayGrade = async (id: string, payGrade: { name: string; minSalary: number; midSalary: number; maxSalary: number; }) => {
    const docRef = doc(db, PAY_GRADES_COLLECTION, id);
    await updateDoc(docRef, payGrade);
};

export const deletePayGrade = async (id: string) => {
    const docRef = doc(db, PAY_GRADES_COLLECTION, id);
    await deleteDoc(docRef);
};

// Job Descriptions
export const getJobDescriptions = async (): Promise<JobDescription[]> => {
    const q = query(collection(db, JOB_DESCRIPTIONS_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as JobDescription));
};

export const addJobDescription = async (jd: Omit<JobDescription, 'id'>) => {
    await addDoc(collection(db, JOB_DESCRIPTIONS_COLLECTION), jd);
};

    
