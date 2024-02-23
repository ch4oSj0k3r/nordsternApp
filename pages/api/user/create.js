// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sha256 from 'crypto-js/sha256'
import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'POST':
            try {
                const user = await prisma.user.create({
                    data: {
                        ...req.body,
                        password: hashPassword(req.body.password),
                    },
                })
                res.status(200).json(user)
            } catch (e) {
                console.error('Request error', e)
                res.status(500).json({ error: 'Error fetching posts' })
            }
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
    }
}

const hashPassword = (password) => {
    return sha256(password).toString()
}
