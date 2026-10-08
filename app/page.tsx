"use client";
import { useState } from "react";
import QRImage from "@/components/QRImage";
import { toPng } from "html-to-image";

export default function Home() {
  const [qrString, setQRString] = useState<string>("");
  const [qrName, setQRName] = useState<string>("");
  const [generateQR, setGenerateQR] = useState<boolean>(false);

  const downloadImage = async () => {
    const element = document.getElementById("qr-container");

    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `${"QR-" + qrName || "qr-code"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-5xl flex-col items-center justify-between py-32 px-8 md:px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex  flex-col-reverse md:flex-row flex-1 items-center justify-center gap-8 w-full">
          <section className="flex flex-col gap-4 flex-1 md:border-r-2 md:border-gray-300 p-4 md:pr-8">
            <div>
              <label className="font-bold" htmlFor="qrName">
                QR Name
              </label>
              <input
                id="qrName"
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
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
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
                <div
                  id="qr-container"
                  className="flex flex-col items-center justify-center gap-4 bg-white p-4 border border-gray-300 rounded-lg shadow-md"
                >
                  <QRImage qrString={qrString} />
                  <h3 className="font-bold text-green-700">{qrName}</h3>
                </div>
                <button
                  onClick={downloadImage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                >
                  Download Image
                </button>
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
