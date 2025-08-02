import { ListItemIcon, MenuItem } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteAction = ({handleDetele,row,deleteType}) => {
  return (
    <MenuItem key="delete" onClick={()=>handleDetele([row.original._id],deleteType)}>
        <ListItemIcon>
             <DeleteIcon/>
        </ListItemIcon>
        Delete
    </MenuItem>
  )
}

export default DeleteAction