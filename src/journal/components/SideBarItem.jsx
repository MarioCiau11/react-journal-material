import { useDispatch } from 'react-redux';
import { useMemo } from 'react'
import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote( {title, body, id, date, imageUrls} ) );
    }

    const newTitle = useMemo(() => {
        return title.length > 10 ? title.slice(0, 10) + '...' : title;
    }, [title]);

  return (
    <ListItem disablePadding>
    <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
            <TurnedInNot />
        </ListItemIcon>
        <Grid container>
            <ListItemText primary={ newTitle } />
            <ListItemText secondary={ body } />
        </Grid>
    </ListItemButton>
</ListItem>
  )
}
