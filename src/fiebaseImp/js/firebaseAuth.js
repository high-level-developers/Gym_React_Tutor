import {addDoc, collection, doc, getDoc, getDocs, limit, query, setDoc, where} from "firebase/firestore";
import {auth, db} from "../main";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification, 
    getAuth
} from "firebase/auth";


const collection_user = "users";


const getUserById = (id) => {
    return getDoc(doc(db, collection_user, id));
}


/*
This function saves a user not ( Not specific )
 */
const saveUser = async (uid, user) => {
    let temp = {...user, activated: true }
    await setDoc(doc(db, collection_user, uid),{
        ...temp
    });
}

/*
This function creates a customer in database with out phone number
 */
const addUserWithEmailAndName = (username, displayname) => {
    return addDoc(collection(db, collection_user),{
        username: username,
        sure_name: displayname,
        role: [5],
        activated:true
    });
}


export const logInWithEmailAndPassword =  (email, password) => {
    let token = '';
    let userId = 0;

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userId = userCredential.user.uid;
            return userCredential.user.getIdToken();
        })
        .then((idtoken)=>{
            token = idtoken;
            return getUserById(userId);
        })
        .then((data)=>{
            data = {...data.data(), id: data.id};
            return {profile:data, error:'', token: token};
        })
        .catch((error) => {
            return {profile:'', error: error.code, token:''};
        });
}

export const signUpWithEmailAndPassword = (user, password) => {
    let token = 0, userId;
    let error = '';
    console.log("Sign up user ", user);
    return createUserWithEmailAndPassword(auth, user.username, password)
        .then((data)=>{
            userId = data.user.uid;
            console.log(auth.currentUser);
            return data.user.getIdToken();
            // sendEmailVerification(auth, user.username)
            // .then(() => {
            //     console.log(data);
            //     return true;
            // })
        })
        .then((idtoken)=>{
            token = idtoken;
            saveUser(userId, user);
            return {token:token, error:''};
        })
        .catch((err)=>{
            return {profile: '', error: err.code, token: token};
        });
}



const provider = new GoogleAuthProvider();
export const loginwithGoogleAccount = ()=>{
    let email = '';
    let token = 0;
    let name = '';
    return signInWithPopup(auth, provider)
        .then((result)=>{
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const accesstoken = credential.accessToken;
            const user = result.user;

            token = credential.idToken;
            email = user.email;
            name = user.displayName;
            console.log(user);
            const q = query(collection(db, collection_user), where("username", "==", user.email), limit(1));
            return getDocs(q);
        })
        .then((docs)=>{
            if(docs.size != 0)
            {
                let profile
                docs.forEach((doc)=>{
                    profile = {...doc.data(), id: doc.id};
                })
                return {profile:profile, error:'', token: token};
            }
            else{
                return addUserWithEmailAndName(email, name)
                    .then(data=>{
                        return {profile:{username:email,sure_name: name, id: data.id}, error:'', token: token};
                    })
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(error);
            return {profile:'', error: error.message, token:''};
        });
}


const appleProvider = new OAuthProvider('apple.com');
appleProvider.addScope('name');

export const loginWithApple = () => {
    let token = '';
    let email = '';
    let name = '';
    return signInWithPopup(auth, appleProvider)
        .then((result) => {
            const user = result.user;

            // Apple credential
            const credential = OAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            token = credential.idToken;
            email = user.email;
            name = user.displayName;
            const q = query(collection(db, collection_user), where("email", "==", user.email), limit(1));
            return getDocs(q);
        })
        .then((docs)=>{
            if(docs.size != 0)
            {
                docs.forEach((doc)=>{
                    return {profile:doc.data(), error:'', token: token};
                })
            }
            else{
                return addUserWithEmailAndName(email, name)
                    .then(data => {
                        return {profile:{username:email, displayName: name, type:5, id: data.id}, error:'', token: token};
                    })
            }
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The credential that was used.
            const credential = OAuthProvider.credentialFromError(error);
            console.log(error);

            return {profile:'', error: error.message, token:''};
        });

}

export const resetPassword = (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email)
        .then(()=>{
            return "Success"
        }).catch((error) =>{
            // const errorCode = er ror.code;
            const errorMessage = error.message;
            return errorMessage
        })
}

export const emailVerification = (email) => {
    const auth = getAuth();
    console.log(auth.currentUser);
    return sendEmailVerification(auth.currentUser, email)
            .then(() => {
                console.log(auth.currentUser);
                return true;
            })
}

export const logOut = ()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        console.log(error)
    });
}
