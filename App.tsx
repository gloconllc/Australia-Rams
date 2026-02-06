import React, { useState, useMemo } from 'react';
import { TripData, BaseItem, FlightItem, HotelItem, ActivityItem } from './types';
import { INITIAL_TRIP_STATE } from './constants';
import { calculateTripBudget, handleVoteLogic } from './utils/tripUtils';
import { pivotDayPlan } from './services/geminiService';
import BudgetBar from './components/BudgetBar';
import DayCard from './components/DayCard';
import DecisionCard from './components/DecisionCard';
import TripFeed from './components/TripFeed';

const App: React.FC = () => {
  const [tripState, setTripState] = useState<TripData>(INITIAL_TRIP_STATE);

  // Derived State
  const budgetState = useMemo(() => calculateTripBudget(tripState), [tripState]);
  const openDecisions = useMemo(() => tripState.decisions.filter(d => d.status === 'open'), [tripState.decisions]);
  
  // -- Actions --

  // 1. Update Status & Cost (Book/Agree)
  const updateItemStatus = (itemId: string, status: BaseItem['status'], actualCost?: number) => {
    const newState = { ...tripState };
    let updatedItemName = '';

    const updateList = (list: any[]) => {
      const idx = list.findIndex(i => i.id === itemId);
      if (idx !== -1) {
         list[idx] = { ...list[idx], status, actualCostPerPerson: actualCost ?? list[idx].actualCostPerPerson };
         updatedItemName = list[idx].name || list[idx].airline || list[idx].title;
         return true;
      }
      return false;
    };

    if (!updateList(newState.items.flights)) {
        if (!updateList(newState.items.hotels)) {
            updateList(newState.items.activities);
        }
    }

    // Add log
    if (status === 'booked' && updatedItemName) {
        newState.activityLog = [
            ...newState.activityLog,
            {
                id: Date.now().toString(),
                message: `${updatedItemName} booked at $${actualCost}/pp.`,
                timestamp: new Date().toISOString(),
                type: 'booking'
            }
        ];
    }

    setTripState(newState);
  };

  // 2. Agree to a full day
  const handleAgreeDay = (dayId: string) => {
    const newState = { ...tripState };
    const day = newState.itinerary.find(d => d.id === dayId);
    if (!day) return;

    let count = 0;
    const agreeItem = (list: any[]) => {
        list.forEach((item, idx) => {
            if (day.linkedItems.includes(item.id) && item.status !== 'booked') {
                list[idx] = { ...item, status: 'agreed' };
                count++;
            }
        });
    };

    agreeItem(newState.items.flights);
    agreeItem(newState.items.hotels);
    agreeItem(newState.items.activities);

    if (count > 0) {
        newState.activityLog = [
            ...newState.activityLog,
            {
                id: Date.now().toString(),
                message: `Group agreed to plan for ${day.city} (Day ${day.dayNumber}).`,
                timestamp: new Date().toISOString(),
                type: 'info'
            }
        ];
        setTripState(newState);
    }
  };

  // 3. Vote Logic
  const handleVote = (decisionId: string, optionId: string, travelerId: string) => {
      const newState = handleVoteLogic(tripState, decisionId, optionId, travelerId);
      
      // Check if this vote resolved it
      const oldDecision = tripState.decisions.find(d => d.id === decisionId);
      const newDecision = newState.decisions.find(d => d.id === decisionId);
      
      if (oldDecision?.status === 'open' && newDecision?.status === 'resolved') {
          // It just resolved
           const winner = newDecision.options.sort((a,b) => b.votes - a.votes)[0];
           newState.activityLog = [
            ...newState.activityLog,
            {
                id: Date.now().toString(),
                message: `Decision Resolved: ${winner.label} selected for ${newDecision.question}.`,
                timestamp: new Date().toISOString(),
                type: 'decision'
            }
        ];
      }
      
      setTripState(newState);
  };

  // 4. Pivot Day Logic (AI)
  const handlePivotDay = async (dayId: string, reason: string): Promise<string> => {
      // Just return the string to the modal, don't update state permanently yet
      const budgetRemaining = Math.max(0, budgetState.target - budgetState.perPersonTotal);
      return await pivotDayPlan(tripState, dayId, reason, budgetRemaining);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* 1. Sticky Budget Header */}
      <BudgetBar budget={budgetState} />

      <main className="max-w-xl mx-auto px-4 py-6">
        
        {/* 2. Feed (Recent Updates) */}
        <TripFeed logs={tripState.activityLog} />

        {/* 3. Decisions (if any open) */}
        {openDecisions.length > 0 && (
            <div className="mb-8">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">!</span>
                    Decisions Needed
                </h2>
                {openDecisions.map(decision => (
                    <DecisionCard
                        key={decision.id}
                        decision={decision}
                        currentTravelerId="traveler1"
                        travelers={tripState.trip.travelers}
                        onVote={handleVote}
                    />
                ))}
            </div>
        )}

        {/* 4. Itinerary Feed */}
        <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Itinerary</h2>
            <div className="space-y-4">
                {tripState.itinerary.map(day => {
                    const dayItems = day.linkedItems.map(itemId => {
                        return (
                            tripState.items.flights.find(f => f.id === itemId) ||
                            tripState.items.hotels.find(h => h.id === itemId) ||
                            tripState.items.activities.find(a => a.id === itemId)
                        );
                    }).filter(Boolean) as (FlightItem | HotelItem | ActivityItem)[];

                    return (
                        <DayCard
                            key={day.id}
                            day={day}
                            items={dayItems}
                            tripState={tripState}
                            onUpdateStatus={updateItemStatus}
                            onAgreeDay={handleAgreeDay}
                            onPivotDay={handlePivotDay}
                        />
                    );
                })}
            </div>
        </div>
      </main>
    </div>
  );
};

export default App;
