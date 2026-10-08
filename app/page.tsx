"use client";
import QRImage from "@/components/QRImage";
import { useState } from "react";

export default function Home() {
  const [qrString, setQRString] = useState<string>("");
  const [qrName, setQRName] = useState<string>("");
  const [generateQR, setGenerateQR] = useState<boolean>(false);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-row flex-1 items-center justify-center gap-8 w-full">
          <section className="flex flex-col gap-4 flex-1 border-r-2 border-gray-300 p-4 pr-8">
            <div>
              <label className="font-bold">QR Name</label>
              <input
                name="qrName"
                className="border border-gray-300 rounded-lg p-2 w-full"
                type="text"
                value={qrName}
                onChange={(e) => setQRName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-bold" htmlFor="qrString">
                QR String
              </label>
              <input
                id="qrString"
                name="qrString"
                className="border border-gray-300 rounded-lg p-2 w-full"
                type="text"
                value={qrString}
                onChange={(e) => {
                  setQRString(e.target.value);
                  setGenerateQR(false);
                }}
              />
            </div>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
              onClick={() => {
                setGenerateQR(true);
              }}
            >
              Generate QR Code
            </button>
          </section>

          <section className="flex flex-col gap-4 flex-1">
            {generateQR && qrString != "" ? (
              <div className="flex flex-col items-center justify-center w-full gap-4">
                <QRImage qrString={qrString} />
                <h3 className="font-bold">{qrName}</h3>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <h3 className="font-bold text-2xl">QR Code Here . .</h3>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
