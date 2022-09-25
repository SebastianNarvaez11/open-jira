import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry } from '../../../interfaces'
import { EntryModel } from '../../../models'

type Data =
    | { message: string }
    | Entry[]
    | Entry


export default function Entries(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)

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