import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topic, amount } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      temperature: 0.7,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: `
Du bist ein professioneller Fußballquiz-Autor.

Antworte ausschließlich mit gültigem JSON.

Das Format MUSS exakt so aussehen:

{
  "questions":[
    {
      "question":"...",
      "answers":[
        "...",
        "...",
        "...",
        "..."
      ],
      "correctAnswer":0
    }
  ]
}

Regeln:

- genau vier Antworten
- nur eine richtige Antwort
- correctAnswer ist 0 bis 3
- keine Erklärungen
- kein Markdown
- kein zusätzlicher Text
`,
        },
        {
          role: "user",
          content: `Erstelle ${amount} hochwertige Fußballquizfragen zum Thema "${topic}".`,
        },
      ],
    });

    const content = completion.choices[0].message.content;

    if (!content) {
      return NextResponse.json(
        {
          error: "Keine Antwort von OpenAI erhalten.",
        },
        {
          status: 500,
        }
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json(
        {
          error: "Ungültiges JSON von OpenAI.",
          raw: content,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "Quiz konnte nicht erzeugt werden.",
      },
      {
        status: 500,
      }
    );
  }
}