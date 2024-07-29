import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [tools, setTools] = useState([])
  const [newTool, setNewTool] = useState({ name: '', category: '', description: '' })

  useEffect(() => {
    fetchTools()
  }, [])

  const fetchTools = async () => {
    const res = await fetch('/api/tools')
    const data = await res.json()
    setTools(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/tools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTool)
    })
    if (res.ok) {
      setNewTool({ name: '', category: '', description: '' })
      fetchTools()
    }
  }

  return (
    <div>
      <Head>
        <title>AI Tools Hub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>AI Tools Hub</h1>
        <p>Discover and manage cutting-edge AI tools for various tasks.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tool Name"
            value={newTool.name}
            onChange={(e) => setNewTool({...newTool, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newTool.category}
            onChange={(e) => setNewTool({...newTool, category: e.target.value})}
            required
          />
          <textarea
            placeholder="Description"
            value={newTool.description}
            onChange={(e) => setNewTool({...newTool, description: e.target.value})}
            required
          />
          <button type="submit">Add Tool</button>
        </form>

        <div>
          {tools.map((tool) => (
            <div key={tool._id}>
              <h2>{tool.name}</h2>
              <p>Category: {tool.category}</p>
              <p>{tool.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

