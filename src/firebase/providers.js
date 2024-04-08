import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FireBaseAuth } from "./config";

export const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {

    try{

        const result = await signInWithPopup(FireBaseAuth, googleProvider);
        // const credential = GoogleAuthProvider.credentialFromResult(result);

        const {displayName, email, photoURL, uid} = result.user;

        return{
            ok: true,
            displayName, email, photoURL, uid
        }
        // console.log({credential});

    }catch(error){

        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage
        }
    }
}

export const registerWithEmailPassword = async ({email, password, displayName}) => {
    
        try{
    

            const result = await createUserWithEmailAndPassword(FireBaseAuth, email, password);
            const { photoURL, uid} = result.user;
    
            await updateProfile(FireBaseAuth.currentUser, {displayName});

            return{
                ok: true,
                displayName, email, photoURL, uid
            }
    
        }catch(error){
    
            const errorMessage = error.message;
    
            return{
                ok: false,
                errorMessage
            }
        }
    }

    export const loginWithEmailPassword = async ({email, password}) => {
        
            try{
        
                const result = await signInWithEmailAndPassword(FireBaseAuth, email, password);
                const {displayName, photoURL, uid} = result.user;
        
                return{
                    ok: true,
                    displayName, email, photoURL, uid
                }
        
            }catch(error){
        
                const errorMessage = error.message;
        
                return{
                    ok: false,
                    errorMessage
                }
            }
        }

export const logoutFirebase = async () => { 
    try{
        await FireBaseAuth.signOut();
        return{
            ok: true
        }
    }catch(error){
        const errorMessage = error.message;
        return{
            ok: false,
            errorMessage
        }
    }
}