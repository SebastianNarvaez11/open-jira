import { useState, ChangeEvent, useContext } from 'react'
import { Button, Box, TextField } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const { setIsAddingEntry, isAddingEntry } = useContext(UIContext)
    const { addNewEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState<string>('')
    const [touched, setTouched] = useState<boolean>(false)

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onSave = () => {
        if (inputValue.length === 0) return

        addNewEntry(inputValue)

        setInputValue('')
        setIsAddingEntry(false)
        setTouched(false)
    }

    return (
        <Box sx={{ marginBottom: 2 }}>
            {isAddingEntry ?
                <>
                    <TextField fullWidth sx={{ marginBottom: 2, marginTop: 2 }}
                        placeholder="Nueva entrada"
                        autoFocus
                        multiline
                        label='Nueva Entrada'
                        helperText='Ingrese un valor'
                        error={inputValue.length <= 0 && touched}
                        value={inputValue}
                        onChange={onTextFieldChange}
                        onBlur={() => setTouched(true)} />

                    <Box display='flex' justifyContent='space-between' >
                        <Button variant="text" onClick={() => { setIsAddingEntry(false); setTouched(false) }}>
                            Cancelar
                        </Button>

                        <Button variant="outlined" color="secondary" endIcon={<SaveIcon />} onClick={onSave}>
                            Guardar
                        </Button>
                    </Box>
                </>
                :
                <Button startIcon={<AddIcon />} fullWidth variant="contained" onClick={() => setIsAddingEntry(true)}>
                    Agregar Tarea
                </Button>
            }
        </Box>
    )
}
