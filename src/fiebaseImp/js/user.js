import { db} from '../main';
import {
    collection,
    doc,
    addDoc,
    updateDoc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    query,
    where,
    limit
    } from 'firebase/firestore';

import { UserTypeArray } from '../../const/userType';
import { getMainGymIDByUser } from './gym_main';
const collection_user = "users";




/*
Gets all users from DB Then filter them if they have gym owner. This is bad function quality. change it with where clause
 */
export const getGymOwners = () =>{
    return getDocs(collection(db, collection_user))
    .then(datas =>{
        let gym_owners = [];
        datas.forEach((data)=>{
            if(data.data().role.includes(3)) {
                gym_owners.push({label: data.data().sure_name, value:data.id});
            }
        });
        return gym_owners;
    })
}


/*
This function returns all employees of a gym. bad quality, it is not using where clause
 */
export const getAllUsers = () => {
    let userInfo = JSON.parse(localStorage.getItem('profile'));
    let gymID
    getMainGymIDByUser(userInfo.id).then( (id) => {
        gymID = id;
    })
    return getDocs(collection(db, collection_user))
    .then(datas =>{
        let users = [];

        datas.forEach((data)=>{
            let user = data.data();
            let type = '';
            user.role.forEach(element => {
                type += UserTypeArray[element] + ', ';
            });
            type = type.replace(/,\s*$/, "");
            if(userInfo.role.includes(3) && !userInfo.role.includes(4)){
                if( (user.role.includes(1) || user.role.includes(6)) && user.gym_id === gymID){
                    users.push({
                        surename: user.sure_name,
                        username: user.username,
                        mobile: user.phone,
                        type: type,
                        activated: user.activated,
                        photo: user.photo,
                        id: data.id,
                    });
                }
            }else{
                users.push({
                    surename: user.sure_name,
                    username: user.username,
                    mobile: user.phone,
                    type: type,
                    membership: user.membership,
                    activated: user.activated,
                    photo: user.photo,
                    id: data.id,
                });
            }
        });
        return users;
    })
}


/*
 Normal update document
 */
export const updateUser = async (id, updatedUser) => {
    await updateDoc(doc(db, collection_user, id), updatedUser);
}


/*
 This updates activated field
 */
export const changeUserActivateState = (id, state) =>{
    return updateDoc(doc(db, collection_user, id),{
            activated: state
        })
        .then(()=>{
            return {success:'success', error:''};
        })
        .catch((error)=>{
            return {success:'', error:error.message};
        })
}



export const updateUserImage = async(uid, url) => {
    await updateDoc(doc(db, collection_user, uid),{
        photo: url
    });
}




