export default async function handler(req, res) {
  // 1. Get the URL for the AI service
  const url = `https://rest.alpha.fal.ai${req.url.replace('/api/fal/proxy', '')}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json",
      },
      // Only send a body if it's a POST request
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    
    // 2. Send the AI's answer back to your website
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to AI" });
  }
}
