import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { mood } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You give short, practical activity suggestions based on mood.",
        },
        {
          role: "user",
          content: `Suggest 3 activities for someone who feels ${mood}.`,
        },
      ],
    });

    res.status(200).json({ suggestions: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "OpenAI failed", details: error.message });
  }
}
