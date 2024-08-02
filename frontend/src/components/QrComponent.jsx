import React from "react";
import qrCode1 from "../assets/img/heart.png"; // Import your QR code images
import qrCode2 from "../assets/img/diabetes.png";
import qrCode3 from "../assets/img/calorie.png";
import qrCode4 from "../assets/img/medicine.png";
import qrCode5 from "../assets/img/lifepurpose.png";


const QRCodeGrid = () => {
  // Array of QR code image paths
  const qrCodes = [qrCode1, qrCode2, qrCode3, qrCode4, qrCode5];
  const captions = [
    "Heart Health Prediction",
    "Diabetes Prediction",
    "Calorie Calculator",
    "Most Common Medicines",
    "Mental Health Awareness",
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Map through the array of QR codes and render each one */}
      {qrCodes.map((qrCode, index) => (
        <div key={index} className="flex flex-col items-center">
          <img src={qrCode} alt={`QR Code ${index + 1}`} className="w-4/5 h-4/5" />
          <p className="text-center mt-2 dark:text-white">{captions[index]}</p>
        </div>
      ))}
    </div>
  );
};

export default QRCodeGrid;
