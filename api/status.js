import { supabase } from '../lib/supabase.js'

export default async function handler(req, res) {

if (req.method === 'GET') {
  const { data, error } = await supabase
    .from('monitor_status')
    .select('occupied, updated_at')
    .eq('id', true)
    .single()

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const elapsed = Date.now() - new Date(data.updated_at).getTime()
  const online = elapsed <= 150_000

  return res.status(200).json({
    ...data,
    online,
  })
}

  if (req.method === 'POST') {
    const { occupied } = req.body

    if (typeof occupied !== 'boolean') {
      return res.status(400).json({
        error: 'occupied precisa ser boolean',
      })
    }

    const { data, error } = await supabase
      .from('monitor_status')
      .update({
        occupied,
        updated_at: new Date().toISOString(),
      })
      .eq('id', true)
      .select('occupied, updated_at')
      .single()

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json({
      success: true,
      ...data,
    })
  }

  return res.status(405).json({
    error: 'Method not allowed',
  })
}