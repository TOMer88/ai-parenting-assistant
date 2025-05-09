export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9
      })
    });

    const data = await openaiRes.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (e) {
    console.error("API 调用出错：", e);
    res.status(500).json({ reply: "AI 生成失败，请稍后再试。" });
  }
}