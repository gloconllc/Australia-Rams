import React from 'react';
import { ActivityLogEntry } from '../types';

interface TripFeedProps {
  logs: ActivityLogEntry[];
}

const TripFeed: React.FC<TripFeedProps> = ({ logs }) => {
  // Show last 3 logs
  const recentLogs = [...logs].reverse().slice(0, 3);

  if (recentLogs.length === 0) return null;

  return (
    <div className="mb-6 space-y-2">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide px-1">Latest Updates</h3>
      {recentLogs.map(log => (
        <div key={log.id} className="bg-white border border-l-4 border-gray-200 border-l-blue-400 rounded-r-lg p-3 shadow-sm flex items-start gap-3 animate-fadeIn">
            <div className="flex-1">
                <p className="text-sm text-gray-800">{log.message}</p>
                <span className="text-[10px] text-gray-400">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
      ))}
    </div>
  );
};

export default TripFeed;
