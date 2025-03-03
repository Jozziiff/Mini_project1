import { useState } from "react";

function ShodanForm() {
  const [target, setTarget] = useState("");
  const [scanResults, setScanResults] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    setScanResults(null);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/shodan_scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: target }),
      });

      if (!res.ok) throw new Error("Shodan API request failed");
      const data = await res.json();
      setScanResults(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const renderPorts = (ports) => (
    <div className="flex flex-wrap gap-2">
      {ports.map((port) => (
        <span key={port} className="px-3 py-1 bg-blue-600 rounded-full text-sm">
          Port {port}
        </span>
      ))}
    </div>
  );

  const renderData = (data) => (
    <div className="space-y-4">
      {data.map((entry, index) => (
        <div key={index} className="p-4 bg-gray-700 rounded-lg">
          <h4 className="text-lg font-semibold mb-2">
            {entry.transport?.toUpperCase()} Service - Port {entry.port}
          </h4>
          <div className="space-y-2">
            <p><span className="text-gray-400">Module:</span> {entry._shodan.module}</p>
            {entry.dns && <p><span className="text-gray-400">DNS Recursion:</span> {entry.dns.recursive ? 'Enabled' : 'Disabled'}</p>}
            {entry.http && (
              <div>
                <p><span className="text-gray-400">HTTP Title:</span> {entry.http.title}</p>
                <p><span className="text-gray-400">Server:</span> {entry.http.server}</p>
                {entry.ssl && (
                  <p><span className="text-gray-400">SSL:</span> {entry.ssl.cipher.name}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 bg-gray-900 max-w-full min-h-screen text-gray-100">
      <form onSubmit={handleScan} className="mb-8 max-w-2xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter IP or domain"
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
          >
            Scan
          </button>
        </div>
      </form>

      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-900/30 border border-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      {scanResults && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 bg-gray-800 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Scan Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Basic Information</h3>
                <p><span className="text-gray-400">IP:</span> {scanResults.ip_str}</p>
                <p><span className="text-gray-400">Location:</span> {scanResults.city}, {scanResults.country_name}</p>
                <p><span className="text-gray-400">Organization:</span> {scanResults.org}</p>
                <p><span className="text-gray-400">ASN:</span> {scanResults.asn}</p>
              </div>

              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Network Details</h3>
                <p><span className="text-gray-400">ISP:</span> {scanResults.isp}</p>
                <p><span className="text-gray-400">Hostnames:</span> {scanResults.hostnames?.join(', ')}</p>
                <p><span className="text-gray-400">Last Update:</span> {new Date(scanResults.last_update).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Open Ports</h3>
              {renderPorts(scanResults.ports)}
            </div>

            <div>
              <h3 className="font-semibold mb-3">Service Details</h3>
              {renderData(scanResults.data)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShodanForm;