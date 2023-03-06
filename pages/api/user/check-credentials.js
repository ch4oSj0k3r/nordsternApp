// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sha256 from 'crypto-js/sha256'
import prisma from '../../../prisma/prisma'

export default async function handler(req, res) {
  const {method} = req
  switch (method) {
    case 'POST':
      try {
        const user = await prisma.user.findUnique({
          where: {email: req.body.username},
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            password: true,
          },
        })
        if (user && user.password == hashPassword(req.body.password)) {
          delete user.password
          res.json(user)
        } else {
          res.status(400).end('Invalid credentials')
        }
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({error: 'Error fetching posts'})
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}

const hashPassword = password => {
  return sha256(password).toString()
}
