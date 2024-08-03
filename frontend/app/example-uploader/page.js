"use client";
 
import { UploadButton } from "../utils/uploadthing";
 
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="videoUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      <></>
    <button onClick={() => {
        const url = "https://utfs.io/f/16ce5a93-e8ac-44e2-a15b-f40a3bbb8ab3-1v7wsv.MOV";
        window.open(url, "_blank");
    }}>Download</button>
    </main>
  );
}