const functions = require("firebase-functions");
const OpenAI = require("openai").default;

exports.getActivitySuggestions = functions.https.onCall(async (data, context) => {
  const mood = data.mood;

  try {
    const client = new OpenAI({
      apiKey: functions.config().openai.key,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that gives short, simple, and helpful activity suggestions based on the user's mood. Always return exactly 3 activities."
        },
        {
          role: "user",
          content: `Suggest 3 small, practical activities for someone who feels: ${mood}.`
        }
      ]
    });

    const suggestions = response.choices[0].message.content;

    return { suggestions };
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new functions.https.HttpsError("internal", "OpenAI API failed");
  }
});
