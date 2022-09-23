import { FC, useContext, useMemo, DragEvent } from 'react'

import { Paper, List } from '@mui/material'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'

import { UIContext } from '../../context/ui'
import { EntriesContext } from '../../context/entries'

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDragging, setIsDragging } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])



    const allowDrop = (event: DragEvent) => {
        event.preventDefault()
    }

    const onDropEntry = (event: DragEvent) => {
        const id = event.dataTransfer.getData('id_entry')
        const entry = entries.find(entry => entry._id === id)!
        entry.status = status
        updateEntry(entry)
        setIsDragging(false)
    }


    return (
        <div onDrop={onDropEntry} onDragOver={allowDrop} className={isDragging ? styles.dragging : ''}>
            <Paper sx={{ height: 'calc(100vh - 250px)', backgroundColor: 'transparent', padding: 1, overflowY: 'auto' }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {entriesByStatus.map(entry => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))}
                </List>
            </Paper>
        </div>
    )
}
