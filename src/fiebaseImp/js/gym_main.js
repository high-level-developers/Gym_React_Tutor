import firebase, { auth, db } from '../main';
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    collectionGroup,
    query,
    arrayUnion,
    arrayRemove,
    where,
    limit
} from 'firebase/firestore';

const collectionName = "gym_main";

export const getGyms = () => {
    return getDocs(collection(db, collectionName));
}

export const getGymInfo = (id) => {

    return getDoc(doc(db, collectionName, id))
        .then(data => {
            return { ...data.data(), id: data.id }
        }).catch((err) => {
            return { err: 'error' };
        })
}

export const createGymId = () => {
    return addDoc(collection(db, collectionName), {})
        .then((data) => {
            return { id: data.id };
        })
        .catch((error) => {
            console.log(error);
        })
}
export const getMainGymIDByUser = (owner) => {
    return getDocs(collection(db, collectionName)).then((datas) => {
        let id = ''
        datas.forEach(data => {
            if (data.data().owner === owner) {
                console.log(data.data().owner, owner)
                id = data.id
            }
        })
        return id
    })

}
export const updateMemberShipCard = (id, path) => {
    return updateDoc(doc(db, collectionName, id), { membershipCardPath: path })
        .then((data) => {
            return { success: 'success', error: '' };
        })
        .catch((error) => {
            console.log(error);
        })
}

export const saveGymInfo = async (id, name, number, path) => {
    const state = JSON.parse(localStorage.getItem('profile'));

    return setDoc(doc(db, collectionName, id), {
        name: name,
        owner: state.id,
        tradeLicenseNumber: number,
        tradeLicenseFilePath: path,
        approved: false
    }).then(() => {
        return { success: 'success', error: '' };
    }).catch((error) => {
        return { error: error.message, success: '' };
    })
}

export const getGymsOption = async ()=>{
    const gymOptions = []
    return getDocs(collection(db, collectionName)).then(gyms => {
        gyms.forEach(gym=>{
            if (gym.data().name === undefined) {
                return;
            }
            gymOptions.push(
                {
                    label: gym.data().name,
                    value: gym.id
                }
            );
        })
        return gymOptions;
    })
}

export const changeGymActivation = (id, state) => {
    return updateDoc(doc(db, collectionName, id),{
        approved: state
    })
    .then(()=>{
        return {success:'success', error:''};
    })
    .catch((error)=>{
        return {success:'', error:error.message};
    })
}
