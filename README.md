# Resume Parser

A Next.js application that parses resumes using Grok AI to extract structured data from PDF, DOC, DOCX, and TXT files.

## Features

- **File Upload**: Drag & drop or browse to upload resume files
- **AI-Powered Parsing**: Uses Grok AI to extract structured data
- **Multiple Formats**: Supports PDF, DOC, DOCX, and TXT files
- **Structured Output**: Extracts name, email, phone, experience, education, skills, and summary
- **Modern UI**: Clean, responsive design with dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Grok API key from [X AI Console](https://console.x.ai/)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables by copying the example:
```bash
# The .env.local file is already created for you
# Just add your Grok API key to it
```

3. Add your Grok API key to `.env.local`:
```
GROK_API_KEY=your_actual_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Get Grok API Key

1. Visit [X AI Console](https://console.x.ai/)
2. Sign up or log in with your X/Twitter account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and add it to your `.env.local` file

## Usage

1. Open the application in your browser
2. Upload a resume file (PDF, DOC, DOCX, or TXT)
3. Wait for Grok AI to process and extract the data
4. View the structured results including:
   - Personal information (name, email, phone)
   - Professional summary
   - Work experience
   - Education
   - Skills
   - Raw text

## Supported File Formats

- **PDF**: Full text extraction
- **DOC/DOCX**: Microsoft Word documents
- **TXT**: Plain text files

## Fallback Parsing

If Grok AI is unavailable or fails, the app includes basic regex-based parsing for:
- Email addresses
- Phone numbers
- Names

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **File Processing**:
  - PDF: pdf-parse
  - DOC/DOCX: mammoth
  - File handling: formidable
- **AI**: Grok API (X AI)

## API Routes

- `POST /api/parse-resume`: Handles file upload and parsing

## Environment Variables

```
GROK_API_KEY=your_grok_api_key_here
```
