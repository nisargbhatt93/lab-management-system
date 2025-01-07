import React, { useState, useEffect } from 'react';
import { fetchPCStatus } from './api';

function Dashboard() {
  const [pcData, setPcData] = useState({});

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await fetchPCStatus();
      setPcData(data);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        PC Status Dashboard
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">PC Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">CPU Usage</th>
              <th className="px-4 py-2">RAM Usage</th>
              <th className="px-4 py-2">Disk Usage</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(pcData).map(([pcName, data]) => (
              <tr
                key={pcName}
                className={`${
                  data.online ? 'bg-green-100' : 'bg-red-100'
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-2 text-center">{pcName}</td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      data.online
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {data.online ? 'Online' : 'Offline'}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">{data.cpu_usage}%</td>
                <td className="px-4 py-2 text-center">{data.ram_usage}%</td>
                <td className="px-4 py-2 text-center">{data.disk_usage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
