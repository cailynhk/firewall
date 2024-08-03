import { exec } from 'child_process';
import path from 'path';

const scriptPath = path.join(process.cwd(), 'app/api/run_command/script.sh');

export async function GET() {
  return new Promise((resolve, reject) => {
    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error.message}`);
        resolve(new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } }));
        return;
      }

      if (stderr) {
        console.error(`Script stderr: ${stderr}`);
        resolve(new Response(JSON.stringify({ output: stderr }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
        return;
      }

      console.log(`Script output: ${stdout}`);
      resolve(new Response('', { status: 302, headers: { 'Location': 'http://localhost:3000/' } }));
    });
  });
}
