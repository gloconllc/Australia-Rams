import React, { useState } from 'react';
import { BaseItem, FlightItem, HotelItem, ActivityItem } from '../types';

interface ItemRowProps {
  item: FlightItem | HotelItem | ActivityItem;
  onUpdateStatus: (itemId: string, status: BaseItem['status'], actualCost?: number) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, onUpdateStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [actualCostInput, setActualCostInput] = useState<string>(item.actualCostPerPerson?.toString() || '');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'booked': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'agreed': return 'bg-green-100 text-green-800 border-green-200';
      case 'proposed': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getIcon = () => {
    if (item.type === 'flight') return '✈️';
    if (item.type === 'hotel') return '🏨';
    return '🎯';
  };

  const getMainText = () => {
    if (item.type === 'flight') return `${item.segment}: ${item.airline}`;
    if (item.type === 'hotel') return item.name;
    return (item as ActivityItem).title;
  };

  const getSubText = () => {
    if (item.type === 'flight') return `${item.from} → ${item.to}`;
    if (item.type === 'hotel') return `${item.city} • ${item.nights} nights`;
    return (item as ActivityItem).city;
  };

  const handleBookedClick = () => {
    if (item.status === 'booked') return;
    setIsEditing(true);
  };

  const confirmBooking = () => {
    const cost = parseFloat(actualCostInput);
    if (!isNaN(cost)) {
      onUpdateStatus(item.id, 'booked', cost);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow mb-2 gap-3">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="text-2xl bg-gray-50 w-10 h-10 flex items-center justify-center rounded-full shrink-0">
          {getIcon()}
        </div>
        <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-900 truncate">{getMainText()}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getStatusColor(item.status)}`}>
                    {item.status}
                </span>
            </div>
            <div className="text-xs text-gray-500 truncate">{getSubText()}</div>
            {item.bookingLink && (
                <a href={item.bookingLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline mt-1 inline-block">
                    View Deal ↗
                </a>
            )}
        </div>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4">
        <div className="text-right">
            {item.status === 'booked' && item.actualCostPerPerson !== null ? (
                <>
                    <div className="font-bold text-gray-900">${item.actualCostPerPerson}</div>
                    <div className="text-xs text-gray-400 line-through">${Math.round(item.estCostPerPerson || 0)} est</div>
                </>
            ) : (
                <div className="font-bold text-gray-600">${Math.round(item.estCostPerPerson || 0)} <span className="text-xs font-normal">est</span></div>
            )}
        </div>

        <div className="flex gap-1 shrink-0">
            {isEditing ? (
                 <div className="flex items-center gap-2 animate-fadeIn">
                    <input
                        type="number"
                        value={actualCostInput}
                        onChange={(e) => setActualCostInput(e.target.value)}
                        placeholder="Actual $"
                        className="w-20 p-1 text-sm border border-gray-300 rounded"
                    />
                    <button onClick={confirmBooking} className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">Save</button>
                    <button onClick={() => setIsEditing(false)} className="text-gray-500 px-2 text-xs">Cancel</button>
                 </div>
            ) : (
                <>
                    {item.status !== 'booked' && (
                        <>
                            <button
                                onClick={() => onUpdateStatus(item.id, 'agreed')}
                                className="p-2 hover:bg-green-50 text-green-600 rounded-full transition-colors"
                                title="Agree"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </button>
                            <button
                                onClick={handleBookedClick}
                                className="p-2 hover:bg-yellow-50 text-yellow-600 rounded-full transition-colors"
                                title="Mark Booked"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"/><path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.5-6.9A2 2 0 0016.5 4H7.5a2 2 0 00-2 1.1z"/></svg>
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
