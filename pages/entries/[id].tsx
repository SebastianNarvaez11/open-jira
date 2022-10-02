import React, { ChangeEvent, FC, useState, useContext } from 'react'
import { GetServerSideProps } from 'next'

import { Layout } from '../../components/layouts'
import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import { Entry, EntryStatus } from '../../interfaces';
import { getEntryById } from '../../database';
import { EntriesContext } from '../../context/entries';

interface Props {
    entry: Entry
}


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

const EntryPage: FC<Props> = ({ entry }) => {

    console.log(entry);

    const { updateEntry } = useContext(EntriesContext)


    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }


    const onSave = () => {

        const update_entry : Entry = {
            ...entry,
            description: inputValue,
            status
        }
        updateEntry(update_entry)
    }


    return (
        <Layout title='Editando Entrada'>

            <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entrada: ${inputValue}`} subheader={'Creada hace ... minutos'} />
                    </Card>
                    <CardContent>
                        <TextField sx={{ marginTop: 2, marginBottom: 1 }}
                            fullWidth
                            placeholder='Nueva Entrada'
                            autoFocus
                            multiline
                            label="Nueva entrada"
                            value={inputValue}
                            onChange={onTextFieldChange} />

                        <FormControl>
                            <FormLabel>Estado:</FormLabel>
                            <RadioGroup row value={status} onChange={onStatusChange}>
                                {validStatus.map(option => (
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio />}
                                        label={capitalize(option)} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button startIcon={<SaveOutlinedIcon />} variant='contained' onClick={onSave}>
                            Guardar
                        </Button>
                    </CardActions>
                </Grid>
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'red'
            }}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>
        </Layout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string }

    const entry = await getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }


    return {
        props: {
            entry: entry
        }
    }
}

export default EntryPage