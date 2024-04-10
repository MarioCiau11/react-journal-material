import { loginWithEmailPassword, logoutFirebase, registerWithEmailPassword, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, logout, login } from "./authSlice"

export const checkingAuth = (email, password) => {
    return async (dispatch) => {
      
        dispatch(checkingCredentials());
    }
}

export const startGoogleSingIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

       const result = await singInWithGoogle()

       if(!result.ok) return  dispatch(logout(result.errorMessage));

       dispatch(login(result));
    }
}

export const startEmailPasswordRegister = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uuid, photoURL, errorMessage} = await registerWithEmailPassword({email, password, displayName});
        
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({email, displayName, photoURL, uuid}));
    }
}

export const startEmailPasswordLogin = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const { ok, uuid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({email, password});
        
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({email, displayName, photoURL, uuid}));
    }
}

export const startLogout = () => {
    return async (dispatch) => {

        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout({}));
    }
}