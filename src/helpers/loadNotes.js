import { collection, getDocs } from "firebase/firestore/lite";
import { FireBaseDB } from "../firebase/config";

export const loadNotes = async (uid = '') => {

    if(!uid) throw new Error('uid is required to load notes');

    const notesSnap = await getDocs(collection(FireBaseDB, `${uid}/journal/notes`));
    const notes = [];
    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    return notes;
}