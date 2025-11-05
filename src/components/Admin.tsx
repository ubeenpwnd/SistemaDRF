import { useState } from 'react';
import { attendances } from '../data/attendances';
import { students } from '../data/students';
import { Shield, UserPlus, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [refresh, setRefresh] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'clave123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Clave incorrecta');
    }
  };

  const handleManualAttendance = () => {
    if (!selectedStudent) return;

    const student = students.find(s => s.id === selectedStudent);
    if (student) {
      const newAttendance = {
        id: Date.now().toString(),
        studentId: student.id,
        studentName: student.name,
        timestamp: new Date(),
        validatedByFace: false
      };
      attendances.push(newAttendance);
      setSelectedStudent('');
      setRefresh(prev => prev + 1);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full">
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administrador</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clave de acceso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa la clave"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Acceder
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              Volver al inicio
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="w-10 h-10 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-800">Panel de Administrador</h1>
            </div>
            <a
              href="/"
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Salir
            </a>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <UserPlus className="w-6 h-6 mr-2 text-blue-600" />
              Registrar Asistencia Manual
            </h2>
            <div className="flex gap-4">
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un estudiante</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleManualAttendance}
                disabled={!selectedStudent}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Registrar
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Registro de Asistencias</h2>
            <div className="bg-gray-50 rounded-xl p-2">
              {attendances.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                  <p className="text-lg">No hay asistencias registradas</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-200 text-left">
                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 rounded-tl-lg">Estudiante</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-700">Fecha</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-700">Hora</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-700 rounded-tr-lg">Validado por Rostro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[...attendances].reverse().map((attendance, index) => (
                        <tr key={attendance.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 text-sm font-medium text-gray-800">{attendance.studentName}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {attendance.timestamp.toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              {attendance.timestamp.toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {attendance.validatedByFace ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Sí
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                <XCircle className="w-4 h-4 mr-1" />
                                No
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
