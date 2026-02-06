import React, { useState } from 'react';
import { ItineraryDay, BaseItem, FlightItem, HotelItem, ActivityItem, TripData } from '../types';
import BookingModal from './BookingModal';
import PivotModal from './PivotModal';

interface DayCardProps {
  day: ItineraryDay;
  items: (FlightItem | HotelItem | ActivityItem)[];
  tripState: TripData;
  onUpdateStatus: (itemId: string, status: BaseItem['status'], actualCost?: number) => void;
  onAgreeDay: (dayId: string) => void;
  onPivotDay: (dayId: string, reason: string) => Promise<string>;
}

const DayCard: React.FC<DayCardProps> = ({ day, items, onUpdateStatus, onAgreeDay, onPivotDay }) => {
  const [expanded, setExpanded] = useState(false);
  const [bookingItem, setBookingItem] = useState<FlightItem | HotelItem | ActivityItem | null>(null);
  const [pivotOpen, setPivotOpen] = useState(false);

  // Check overall status of the day
  const isBooked = items.every(i => i.status === 'booked');
  const isAgreed = !isBooked && items.every(i => i.status === 'agreed' || i.status === 'booked');
  
  const statusBadge = isBooked 
    ? <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded uppercase">Locked In</span>
    : isAgreed 
        ? <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase">Agreed</span>
        : null;

  const totalEst = items.reduce((acc, curr) => acc + (curr.actualCostPerPerson ?? curr.estCostPerPerson ?? 0), 0);

  return (
    <div className={`bg-white rounded-xl border mb-4 transition-shadow ${day.isHighlight ? 'border-blue-200 shadow-md ring-1 ring-blue-50' : 'border-gray-200 shadow-sm'}`}>
      
      {/* Main Card Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Day {day.dayNumber} • {day.date}</span>
                    {statusBadge}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{day.title}</h3>
                <div className="text-xs font-medium text-gray-500 mt-0.5">{day.city}</div>
            </div>
            {day.isHighlight && <span className="text-xl">🌟</span>}
        </div>

        {/* Narrative Plan */}
        <div className="mt-3 space-y-1">
            {day.planBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start text-sm text-gray-700">
                    <span className="mr-2 text-gray-300">•</span>
                    {bullet}
                </div>
            ))}
        </div>

        {/* Footer: Cost & Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">~${Math.round(totalEst)}</span> <span className="text-xs">per person</span>
            </div>

            <div className="flex items-center gap-2">
                {!isAgreed && !isBooked && (
                     <button 
                        onClick={() => onAgreeDay(day.id)}
                        className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                     >
                        <span>✅</span> I'm good with this
                     </button>
                )}
                
                <button 
                    onClick={() => setExpanded(!expanded)}
                    className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-50"
                    title="View Details / Book"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${expanded ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
            </div>
        </div>
      </div>

      {/* Expanded Details Pane */}
      {expanded && (
          <div className="bg-gray-50 border-t border-gray-100 p-4 rounded-b-xl animate-fadeIn">
              <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Line Items</h4>
                  <button onClick={() => setPivotOpen(true)} className="text-xs text-blue-600 font-bold hover:underline">Change today's plan?</button>
              </div>
              
              <div className="space-y-2">
                  {items.map(item => (
                      <div key={item.id} className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                          <div className="flex items-center gap-2 overflow-hidden">
                              <span className="text-lg">{item.type === 'flight' ? '✈️' : item.type === 'hotel' ? '🏨' : '🎯'}</span>
                              <div className="min-w-0">
                                  <div className="text-sm font-bold text-gray-900 truncate">
                                      {item.type === 'flight' ? (item as FlightItem).airline : (item as any).name || (item as any).title}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                      {item.status === 'booked' ? 'Booked' : 'Estimated'}: ${Math.round(item.actualCostPerPerson ?? item.estCostPerPerson ?? 0)}
                                  </div>
                              </div>
                          </div>
                          
                          {item.status !== 'booked' && (
                              <button 
                                onClick={() => setBookingItem(item)}
                                className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-1 rounded font-bold hover:bg-yellow-100"
                              >
                                  Mark Booked
                              </button>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Modals */}
      {bookingItem && (
          <BookingModal 
            item={bookingItem} 
            onClose={() => setBookingItem(null)} 
            onConfirm={(cost) => {
                onUpdateStatus(bookingItem.id, 'booked', cost);
                setBookingItem(null);
            }} 
          />
      )}
      
      {pivotOpen && (
          <PivotModal 
            day={day} 
            onClose={() => setPivotOpen(false)} 
            onPivot={onPivotDay}
          />
      )}

    </div>
  );
};

export default DayCard;
