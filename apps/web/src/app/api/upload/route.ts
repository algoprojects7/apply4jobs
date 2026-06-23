import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { mkdir } from 'fs/promises';

function getUploadsDir() {
  if (process.env.UPLOADS_DIR) {
    return path.resolve(process.env.UPLOADS_DIR);
  }
  let current = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(current, 'pnpm-workspace.yaml')) || fs.existsSync(path.join(current, '.git'))) {
      return path.join(path.dirname(current), 'apply4jobs-uploads');
    }
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return path.resolve(path.join(process.cwd(), '..', '..', '..', 'apply4jobs-uploads'));
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ status: 'error', message: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique name
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substring(2, 8);
    const ext = path.extname(file.name) || '.png';
    const safeName = `${timestamp}-${uniqueId}${ext}`;

    const uploadsDir = getUploadsDir();
    await mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, safeName);
    fs.writeFileSync(filePath, buffer);

    const url = `/api/uploads/${safeName}`;

    return NextResponse.json({
      status: 'success',
      data: {
        url,
        filename: safeName,
      }
    });
  } catch (err: any) {
    console.error('Error handling upload:', err);
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
