export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
  const targetUrl = `https://rest.alpha.fal.ai${req.url.replace('/api/fal/proxy', '')}`;
  
  const response = await fetch(targetUrl, {
    method: req.method,
    headers: {
      "Authorization": `Key ${process.env.FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
