import React from 'react';
import { TripBudgetState } from '../types';

interface BudgetBarProps {
  budget: TripBudgetState;
}

const BudgetBar: React.FC<BudgetBarProps> = ({ budget }) => {
  const { perPersonTotal, target, flightTotal, hotelTotal, activityTotal } = budget;

  let statusColor = 'text-green-600 bg-green-50 border-green-200';
  let statusText = 'On Track';
  if (perPersonTotal > target + 250) {
    statusColor = 'text-red-600 bg-red-50 border-red-200';
    statusText = 'Over Target';
  } else if (perPersonTotal > target - 250) {
    statusColor = 'text-yellow-600 bg-yellow-50 border-yellow-200';
    statusText = 'Near Limit';
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          
          {/* Main Total */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
             <div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Est. Per Person</div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-gray-900">${Math.round(perPersonTotal).toLocaleString()}</span>
                    <span className="text-sm text-gray-400 font-medium">/ ${target.toLocaleString()} Goal</span>
                </div>
             </div>
             <div className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor}`}>
                {statusText}
             </div>
          </div>

          {/* Breakdown Pills */}
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
             <div className="flex-1 sm:flex-none bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-center min-w-[80px]">
                <div className="text-[10px] text-gray-500 uppercase font-bold">Flights</div>
                <div className="text-sm font-semibold text-gray-700">${Math.round(flightTotal)}</div>
             </div>
             <div className="flex-1 sm:flex-none bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-center min-w-[80px]">
                <div className="text-[10px] text-gray-500 uppercase font-bold">Hotels</div>
                <div className="text-sm font-semibold text-gray-700">${Math.round(hotelTotal)}</div>
             </div>
             <div className="flex-1 sm:flex-none bg-gray-50 border border-gray-200 rounded px-3 py-1.5 text-center min-w-[80px]">
                <div className="text-[10px] text-gray-500 uppercase font-bold">Activities</div>
                <div className="text-sm font-semibold text-gray-700">${Math.round(activityTotal)}</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BudgetBar;
