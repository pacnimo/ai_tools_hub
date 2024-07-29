import { connectToDatabase } from '../../util/mongodb'

export default async function handler(req, res) {
  const { db } = await connectToDatabase()

  if (req.method === 'GET') {
    const tools = await db.collection('tools').find({}).toArray()
    res.json(tools)
  } else if (req.method === 'POST') {
    const newTool = req.body
    const result = await db.collection('tools').insertOne(newTool)
    res.status(201).json(result.ops[0])
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

// File: util/mongodb.js
import { MongoClient } from 'mongodb'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local')
}

let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

