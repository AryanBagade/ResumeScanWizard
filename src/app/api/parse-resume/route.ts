import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import pdf from 'pdf-parse-new';
import mammoth from 'mammoth';

export const config = {
  api: {
    bodyParser: false,
  },
};


async function parseWithGrok(text: string) {
  const apiKey = process.env.GROK_API_KEY;

  if (!apiKey) {
    throw new Error('Grok API key not configured');
  }

  const prompt = `Parse this resume text and extract the following information in JSON format:
{
  "name": "Full name",
  "email": "Email address",
  "phone": "Phone number",
  "summary": "Professional summary or objective",
  "experience": [
    {
      "company": "Company name",
      "position": "Job title",
      "duration": "Employment duration",
      "description": "Job description"
    }
  ],
  "education": [
    {
      "institution": "School/University name",
      "degree": "Degree/certification",
      "year": "Graduation year"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"]
}

Resume text:
${text}

Please extract the information and return ONLY the JSON object, no additional text.`;

  return await callGrokAPI(prompt);
}

async function getHonestResumeReview(text: string) {
  const apiKey = process.env.GROK_API_KEY;

  if (!apiKey) {
    throw new Error('Grok API key not configured');
  }

  const prompt = `You are the vile and honest resume reviewer. People give you a resume, and you must return the same resume, except with each description as an insulting, funny, but most importantly honest version. You may use any information plausibly inferred from the resume: race and gender. For example, if someone claims to have built a "Revolutionary AI startup", you'll replace that with the fact that its nothing more than a GPT wrapper. You will return a json table with the following keys: Experience, ProjectsAndAwards. each entry should be a list of json tables with the Role Title, Company, and Description.

Resume text:
${text}

Return ONLY the JSON object with the honest review, no additional text.`;

  return await callGrokAPI(prompt);
}

async function callGrokAPI(prompt: string) {
  const apiKey = process.env.GROK_API_KEY;

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'grok-4',
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Grok API error response:', errorText);
      throw new Error(`Grok API error: ${response.status} - ${errorText}`);
    }

    const responseText = await response.text();
    console.log('Grok API response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (jsonError) {
      console.error('Failed to parse Grok response as JSON:', responseText);
      throw new Error('Invalid JSON response from Grok API');
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in Grok response:', data);
      throw new Error('No content received from Grok');
    }

    try {
      return JSON.parse(content);
    } catch (parseError) {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse JSON from Grok response');
    }
  } catch (error) {
    console.error('Grok API error:', error);
    throw error;
  }
}

function extractBasicInfo(text: string, regex: RegExp): string | undefined {
  const match = text.match(regex);
  return match ? match[1] : undefined;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let text: string;
    const fileExtension = file.name.toLowerCase().split('.').pop();

    switch (fileExtension) {
      case 'pdf':
        const pdfData = await pdf(buffer);
        text = pdfData.text;
        break;

      case 'doc':
      case 'docx':
        const docxData = await mammoth.extractRawText({ buffer });
        text = docxData.value;
        break;

      case 'txt':
        text = buffer.toString('utf-8');
        break;

      default:
        return NextResponse.json(
          { error: 'Unsupported file format' },
          { status: 400 }
        );
    }

    try {
      const [parsedData, honestReview] = await Promise.all([
        parseWithGrok(text),
        getHonestResumeReview(text)
      ]);

      return NextResponse.json({
        success: true,
        data: {
          ...parsedData,
          rawText: text,
          honestReview: honestReview
        }
      });
    } catch (grokError) {
      console.error('Grok API failed, using fallback parsing:', grokError);

      const fallbackData = {
        name: extractBasicInfo(text, /([A-Z][a-z]+ [A-Z][a-z]+)/),
        email: extractBasicInfo(text, /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/),
        phone: extractBasicInfo(text, /(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/),
        summary: "Unable to parse with AI - please check manually",
        experience: [],
        education: [],
        skills: [],
        rawText: text,
        honestReview: { Experience: [], ProjectsAndAwards: [] }
      };

      return NextResponse.json({
        success: true,
        data: fallbackData
      });
    }

  } catch (error) {
    console.error('Error parsing resume:', error);
    return NextResponse.json(
      { error: 'Failed to parse resume' },
      { status: 500 }
    );
  }
}