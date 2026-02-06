import React from 'react';
import { TripStatusSummary, TripBudgetState } from '../types';

interface TripSummaryProps {
  summary: TripStatusSummary;
  budget: TripBudgetState;
}

const TripSummary: React.FC<TripSummaryProps> = ({ summary, budget }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Trip Status Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Item Status */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Planning Progress</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-gray-900">
              {summary.items.booked + summary.items.agreed}
            </span>
            <span className="text-xs text-gray-400">/ {summary.items.total} items</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden flex">
            <div style={{ width: `${(summary.items.booked / summary.items.total) * 100}%` }} className="bg-yellow-400 h-full" />
            <div style={{ width: `${(summary.items.agreed / summary.items.total) * 100}%` }} className="bg-green-500 h-full" />
            <div style={{ width: `${(summary.items.proposed / summary.items.total) * 100}%` }} className="bg-blue-400 h-full" />
          </div>
          <div className="flex gap-2 mt-1.5">
             <span className="text-[10px] text-gray-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Booked</span>
             <span className="text-[10px] text-gray-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Agreed</span>
          </div>
        </div>

        {/* Decisions */}
        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
          <div className="text-xs text-indigo-500 mb-1">Group Decisions</div>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-indigo-900">
              {summary.decisions.resolved}
            </span>
            <span className="text-xs text-indigo-400">/ {summary.decisions.total} resolved</span>
          </div>
           <div className="mt-2 text-xs text-indigo-600 font-medium">
             {summary.decisions.open} requiring votes
           </div>
        </div>

        {/* Budget Health */}
        <div className={`p-3 rounded-lg border ${summary.budgetHealth === 'over' ? 'bg-red-50 border-red-100' : summary.budgetHealth === 'under' ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'}`}>
          <div className={`text-xs mb-1 ${summary.budgetHealth === 'over' ? 'text-red-500' : summary.budgetHealth === 'under' ? 'text-green-600' : 'text-blue-500'}`}>
            Budget Health
          </div>
          <div className={`text-xl font-bold ${summary.budgetHealth === 'over' ? 'text-red-900' : summary.budgetHealth === 'under' ? 'text-green-900' : 'text-blue-900'}`}>
             {summary.budgetHealth === 'over' ? 'Over Target' : summary.budgetHealth === 'under' ? 'Under Budget' : 'On Track'}
          </div>
          <div className="mt-2 text-xs opacity-75">
             {summary.budgetHealth === 'over' ? 'Look for savings in hotels' : 'Room for extra activities!'}
          </div>
        </div>
        
        {/* Next Action */}
        <div className="p-3 bg-white rounded-lg border border-dashed border-gray-300 flex flex-col justify-center items-center text-center">
             <span className="text-xs text-gray-400 font-medium">Next Action</span>
             <span className="text-sm font-bold text-blue-600 mt-1">
                {summary.decisions.open > 0 ? 'Vote on Decisions' : 'Book Flights'}
             </span>
        </div>

      </div>
    </div>
  );
};

export default TripSummary;
