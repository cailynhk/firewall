// app/page.js

'use client';  // Add this if you're using Next.js App Router

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/example-uploader');
  };

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <button onClick={handleNavigate}>Go to Example Uploader</button>
    </div>
  );
}
