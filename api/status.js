
export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      occupied: false,
      updatedAt: new Date().toISOString(),
    });
  }

  if (req.method === 'POST') {
    const { occupied } = req.body;

    if (typeof occupied !== 'boolean') {
      return res.status(400).json({
        error: 'occupied precisa ser boolean',
      });
    }

    return res.status(200).json({
      success: true,
      received: occupied,
    });
  }

  return res.status(405).json({
    error: 'Method not allowed',
  });
}
