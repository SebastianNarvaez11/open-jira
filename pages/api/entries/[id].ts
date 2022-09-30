import mongoose from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../database"
import { Entry } from "../../../interfaces"
import { EntryModel } from "../../../models"

type Data =
    | { message: string }
    | Entry



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido' })
    }

    switch (req.method) {
        case 'PUT':
            return putEntries(req, res)

        case 'GET':
            return getEntry(req, res)

        default:
            return res.status(400).json({ message: 'Endpoint no existe' })
    }
}



const putEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    await db.connect()
    const entry = await EntryModel.findById(id)

    if (!entry) {
        await db.disconnect()
        return res.status(400).json({ message: 'No existe una entrada con ese id' })
    }

    const { description = entry.description, status = entry.status } = req.body

    try {
        const newEntry = await EntryModel.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        await db.disconnect()
        res.status(200).json(newEntry!)

    } catch (error) {
        await db.disconnect()
        return res.status(400).json({ message: 'bad request' })
    }

}



const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    await db.connect()
    const entry = await EntryModel.findById(id)
    await db.disconnect()

    if (!entry) {
        return res.status(400).json({ message: 'No existe una entrada con ese id' })
    }

    res.status(200).json(entry)
} 