import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { FireBaseDB } from "../../firebase/config";
import { addNewNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
        return async (dispatch, getState) => {

            const { uid } = getState().auth;

            dispatch(savingNewNote());

            const newNote = {
                title: '',
                body: '',
                imageUrls: [],
                date: new Date().getTime(),
            };


            const docRef = doc(collection(FireBaseDB, `${uid}/journal/notes`));
            await setDoc(docRef, newNote);


            newNote.id = uid;

            dispatch(addNewNote(newNote));
            dispatch(setActiveNote(newNote));
        };
    }

export const startLoadingNotes = () => {
        return async (dispatch, getState) => {

            const { uid } = getState().auth;

            if(!uid) throw new Error('No hay uid');

            const notes = await loadNotes(uid);

            dispatch(setNotes(notes));
        };
    }

export const startSaveNote = () => {
        return async (dispatch, getState) => {

            dispatch(setSaving());

            const { uid } = getState().auth;
            const { active: note } = getState().journal;

            const docRef = doc(collection(FireBaseDB, `${uid}/journal/notes`), note.id);
            await setDoc(docRef, note);

            dispatch(updateNote(note));
        };
    }

export const startUploadingFiles = (files = []) => {
        return async (dispatch) => {

            dispatch(setSaving());

            // const fileUrl = await fileUpload(files[0]);

            const fileUploadPromises = [];
            for (const file of files) {
                fileUploadPromises.push(fileUpload(file));
            }

            const photosUrls = await Promise.all(fileUploadPromises);
            dispatch(setPhotosToActiveNote(photosUrls));

        
        };
    }

export const startDeletingNote = () => {
        return async (dispatch, getState) => {

            const { uid } = getState().auth;
            const { active: note } = getState().journal;

            console.log(uid, note);

            const docRef = doc( FireBaseDB, `${uid}/journal/notes/${note.id}`);
            await deleteDoc(docRef);

            dispatch(deleteNoteById(note.id));
        };
    }