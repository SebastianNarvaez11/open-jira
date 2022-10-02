import { FC, DragEvent, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { Entry } from "../../interfaces"
import { UIContext } from '../../context/ui'
import { useRouter } from 'next/router'

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { setIsDragging } = useContext(UIContext)

    const router = useRouter()

    const onDragStart = (event: DragEvent) => {
        setIsDragging(true)
        event.dataTransfer.setData('id_entry', entry._id)
    }

    const onDragEnd = () => {
        setIsDragging(false)
    }

    return (
        <Card sx={{ marginBottom: 1 }} draggable onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={() => router.push(`/entries/${entry._id}`)}>
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant="body2">hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
