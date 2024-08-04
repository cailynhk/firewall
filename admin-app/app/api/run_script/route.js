// app/api/run-script/route.js
import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await new Promise((resolve, reject) => {
      exec('bash script.sh', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error);
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        resolve();
      });
    });

    // Return a response indicating success
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
