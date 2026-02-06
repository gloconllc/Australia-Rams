import React, { useState } from 'react';
import { ItineraryDay } from '../types';

interface PivotModalProps {
  day: ItineraryDay;
  onClose: () => void;
  onPivot: (dayId: string, reason: string) => Promise<string>;
}

const PivotModal: React.FC<PivotModalProps> = ({ day, onClose, onPivot }) => {
  const [reason, setReason] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const reasons = ["It's raining 🌧️", "We're tired 😴", "Want something cheaper 💸", "Feeling adventurous 🌋"];

  const handleSubmit = async () => {
    if (!reason) return;
    setLoading(true);
    const suggestion = await onPivot(day.id, reason);
    setResult(suggestion);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Change plans for {day.city}?</h3>
            <p className="text-sm text-gray-500 mb-4">Day {day.dayNumber} • {day.date}</p>

            {!result ? (
                <>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                        Why the change?
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                        {reasons.map(r => (
                            <button 
                                key={r} 
                                onClick={() => setReason(r)}
                                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${reason === r ? 'bg-blue-100 border-blue-300 text-blue-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <textarea 
                        value={reason} 
                        onChange={e => setReason(e.target.value)}
                        placeholder="Or type your own reason..."
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                        rows={3}
                    />
                    
                    <div className="flex gap-3">
                        <button onClick={onClose} className="flex-1 py-2 text-gray-600 font-bold text-sm hover:bg-gray-50 rounded-lg">
                            Cancel
                        </button>
                        <button onClick={handleSubmit} disabled={!reason || loading} className="flex-1 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50">
                            {loading ? 'Thinking...' : 'Get Alternatives'}
                        </button>
                    </div>
                </>
            ) : (
                <div className="animate-fadeIn">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-gray-800 whitespace-pre-line mb-4">
                        {result}
                    </div>
                    <button onClick={onClose} className="w-full py-2 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-200">
                        Close
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default PivotModal;
