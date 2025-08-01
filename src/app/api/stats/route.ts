import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

const statsFile = path.join(process.cwd(), 'data', 'stats.json');

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, value } = body;

  try {
    const raw = await readFile(statsFile, 'utf-8');
    const data = JSON.parse(raw);
    data[type] = value;

    await writeFile(statsFile, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Speichern der Daten.' }, { status: 500 });
  }


  
}

export async function GET() {
  try {
    const raw = await readFile(statsFile, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Fehler beim Lesen der Daten.' }, { status: 500 });
  }
}