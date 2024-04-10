import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: '',
        //     imageUrls: [],
        // },
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state, action) => {
            state.isSaving = true;
        },
            updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if( note.id === action.payload.id ) {
                    return action.payload;
                }
                return note;
            });

            //TODO: Mostar mensaje de guardado
            state.messageSaved = `${action.payload.title}, actualizado correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewNote, 
    clearNotesLogout,
    deleteNoteById,
    savingNewNote, 
    setActiveNote, 
    setNotes, 
    setPhotosToActiveNote, 
    setSaving, 
    updateNote, 
} = journalSlice.actions;