import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generateQRCode } from '../utils/qrGenerator';
import { QrCode } from 'lucide-react';

export const Reception = () => {
  const [qrCode, setQrCode] = useState('');
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    setQrCode(generateQRCode());
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const newCode = generateQRCode();
          setQrCode(newCode);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const scanUrl = `${window.location.origin}/scan/${qrCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-lg w-full">
        <div className="flex items-center justify-center mb-8">
          <QrCode className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Asistencia Inteligente</h1>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-2">Escanea el código QR para registrar tu asistencia</p>
          <p className="text-sm text-gray-500">El código cambia automáticamente cada 15 segundos</p>
        </div>

        <div className="flex justify-center mb-6 bg-gray-50 p-8 rounded-xl">
          <QRCodeSVG value={scanUrl} size={256} level="H" />
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-6 py-3 rounded-full">
            <span className="text-sm font-semibold">Tiempo restante: </span>
            <span className="text-2xl font-bold ml-2">{countdown}s</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <a
            href="/admin"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Panel de administrador
          </a>
        </div>
      </div>
    </div>
  );
};
