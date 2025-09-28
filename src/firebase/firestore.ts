

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
const REQUISITIONS_COLLECTION = "requisitions";
const REFERRALS_COLLECTION = "referrals";
const TALENT_POOL_COLLECTION = "talentPool";


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

export type Requisition = {
    id: string;
    title: string;
    budget: string;
    status: "Draft" | "Open" | "Filled" | "Canceled";
    posted: string;
};

export type Referral = {
    id: string;
    employee: string;
    candidate: string;
    status: "New Submission" | "Interviewing" | "Hired" | "Rejected";
    bonus: string;
}

export type TalentPoolCandidate = {
    id: string;
    name: string;
    role: string;
    skills: string;
    location: string;
}


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

// Requisitions
export const getRequisitions = async () => {
    const q = query(collection(db, REQUISITIONS_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addRequisition = async (requisition: Omit<Requisition, 'id'>) => {
    await addDoc(collection(db, REQUISITIONS_COLLECTION), requisition);
};

export const updateRequisition = async (id: string, requisition: Partial<Requisition>) => {
    const docRef = doc(db, REQUISITIONS_COLLECTION, id);
    await updateDoc(docRef, requisition);
};

export const deleteRequisition = async (id: string) => {
    const docRef = doc(db, REQUISITIONS_COLLECTION, id);
    await deleteDoc(docRef);
};

// Referrals
export const getReferrals = async () => {
    const q = query(collection(db, REFERRALS_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addReferral = async (referral: Omit<Referral, 'id'>) => {
    await addDoc(collection(db, REFERRALS_COLLECTION), referral);
};

export const updateReferral = async (id: string, referral: Partial<Referral>) => {
    const docRef = doc(db, REFERRALS_COLLECTION, id);
    await updateDoc(docRef, referral);
};

export const deleteReferral = async (id: string) => {
    const docRef = doc(db, REFERRALS_COLLECTION, id);
    await deleteDoc(docRef);
};

// Talent Pool
export const getTalentPool = async () => {
    const q = query(collection(db, TALENT_POOL_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addTalentPoolCandidate = async (candidate: Omit<TalentPoolCandidate, 'id'>) => {
    await addDoc(collection(db, TALENT_POOL_COLLECTION), candidate);
};

export const updateTalentPoolCandidate = async (id: string, candidate: Partial<TalentPoolCandidate>) => {
    const docRef = doc(db, TALENT_POOL_COLLECTION, id);
    await updateDoc(docRef, candidate);
};

export const deleteTalentPoolCandidate = async (id: string) => {
    const docRef = doc(db, TALENT_POOL_COLLECTION, id);
    await deleteDoc(docRef);
};
