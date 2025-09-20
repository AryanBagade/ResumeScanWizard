import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { resumeText, parsedData } = await request.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.TAVUS_API_KEY;
    const replicaId = process.env.TAVUS_REPLICA_ID;
    const personaId = process.env.TAVUS_PERSONA_ID;

    if (!apiKey || !replicaId || !personaId) {
      return NextResponse.json(
        { error: 'Tavus configuration not found' },
        { status: 500 }
      );
    }

    const conversationalContext = `This is a job interview for an engineer role. Be smug, insulting, and patronising. Don't ask them follow-up questions. Just bully them a little bit, professionally. The person you are interviewing has this resume: ${resumeText}`;

    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        "replica_id": replicaId,
        "conversation_name": `Interview_${Date.now()}`,
        "persona_id": personaId,
        "custom_greeting": "Hey applicant, tell me a little about yourself.",
        "conversational_context": conversationalContext,
        "properties": {
            "participant_left_timeout": 0,
            "language": "english"
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Tavus API error:', errorText);
      return NextResponse.json(
        { error: `Tavus API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      conversation: data
    });

  } catch (error) {
    console.error('Error starting interview:', error);
    return NextResponse.json(
      { error: 'Failed to start interview' },
      { status: 500 }
    );
  }
}