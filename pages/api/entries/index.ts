import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry } from '../../../interfaces'
import { EntryModel } from '../../../models'

type Data =
    | { message: string }
    | Entry[]
    | Entry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)


        case 'POST':
            return postEntries(req, res)


        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }

}



const getEntries = async (res: NextApiResponse<Data>) => {

    await db.connect()
    const entries: Entry[] = await EntryModel.find().sort({ createdAt: 'ascending' })
    await db.disconnect()

    res.status(200).json(entries)
}


const postEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description } = req.body

    const newEntry = new EntryModel({ description, createdAt: Date.now() })

    try {
        await db.connect()
        await newEntry.save()
        await db.disconnect()

        return res.status(201).json(newEntry)

    } catch (error) {
        await db.disconnect()
        console.log(error);
        return res.status(500).json({ message: 'Ocurrio un error al crear la entrada' })
    }
}


