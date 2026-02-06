import React, { useState } from 'react';
import { BaseItem, FlightItem, ActivityItem, HotelItem } from '../types';

interface BookingModalProps {
  item: FlightItem | HotelItem | ActivityItem;
  onClose: () => void;
  onConfirm: (actualCost: number) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ item, onClose, onConfirm }) => {
  const [cost, setCost] = useState('');

  const getName = () => {
       if (item.type === 'flight') return `${(item as FlightItem).segment} Flight`;
       if (item.type === 'hotel') return (item as HotelItem).name;
       return (item as ActivityItem).title;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(cost);
    if (!isNaN(val)) {
        onConfirm(val);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Confirm Booking</h3>
            <p className="text-sm text-gray-500 mb-4">You're locking in <strong>{getName()}</strong>.</p>
            
            <form onSubmit={handleSubmit}>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
                    Actual Cost (Per Person)
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input 
                        type="number" 
                        value={cost} 
                        onChange={e => setCost(e.target.value)}
                        placeholder={`${item.estCostPerPerson}`}
                        className="w-full pl-6 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-lg font-bold text-gray-900"
                        autoFocus
                    />
                </div>
                
                <div className="flex gap-3 mt-6">
                    <button type="button" onClick={onClose} className="flex-1 py-2 text-gray-600 font-bold text-sm hover:bg-gray-50 rounded-lg">
                        Cancel
                    </button>
                    <button type="submit" disabled={!cost} className="flex-1 py-2 bg-blue-600 text-white font-bold text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50">
                        Confirm
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
