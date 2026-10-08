import QRCode from "react-qr-code";

interface QRImageProps {
  qrString: string;
}

const QRImage = ({ qrString }: QRImageProps) => {
  return (
    <div className="border border-gray-300 rounded-lg p-2 bg-white shadow-md">
      <QRCode
        value={qrString}
        size={200}
        // bgColor="#FFFFFF"
        // fgColor="#000000"
        // level="Q"
        id="qr-code-svg"
      />
    </div>
  );
};

export default QRImage;
