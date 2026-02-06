import { TripData, TripBudgetState, TripStatusSummary, BaseItem, Decision } from '../types';

/**
 * Calculates the current budget state based on all items.
 * Uses actual costs if available, otherwise estimated costs.
 * Handles shared costs (hotels) vs individual costs (flights/activities).
 */
export const calculateTripBudget = (tripState: TripData): TripBudgetState => {
  let flightTotal = 0;
  let hotelTotal = 0;
  let activityTotal = 0;

  tripState.items.flights.forEach(f => {
    // Flight costs are per person
    flightTotal += f.actualCostPerPerson ?? f.estCostPerPerson ?? 0;
  });

  tripState.items.hotels.forEach(h => {
    // Hotel costs in JSON are pre-calculated per person in 'estCostPerPerson'
    // or 'actualCostPerPerson' if booked.
    // If logic needed raw calculation: (rooms * nights * rate) / 3
    hotelTotal += h.actualCostPerPerson ?? h.estCostPerPerson ?? 0;
  });

  tripState.items.activities.forEach(a => {
    activityTotal += a.actualCostPerPerson ?? a.estCostPerPerson ?? 0;
  });

  const grandTotal = flightTotal + hotelTotal + activityTotal;

  return {
    flightTotal,
    hotelTotal,
    activityTotal,
    grandTotal,
    perPersonTotal: grandTotal,
    target: tripState.trip.budgetPerPersonTarget
  };
};

/**
 * Generates a summary of item statuses and decision states for the dashboard.
 */
export const getTripStatusSummary = (tripState: TripData, budget: TripBudgetState): TripStatusSummary => {
  const allItems = [
    ...tripState.items.flights,
    ...tripState.items.hotels,
    ...tripState.items.activities
  ];

  const summary: TripStatusSummary = {
    items: {
      total: allItems.length,
      booked: 0,
      agreed: 0,
      proposed: 0,
      idea: 0
    },
    decisions: {
      total: tripState.decisions.length,
      open: 0,
      resolved: 0
    },
    budgetHealth: 'on-track'
  };

  // Count Items
  allItems.forEach(item => {
    if (item.status === 'booked') summary.items.booked++;
    else if (item.status === 'agreed') summary.items.agreed++;
    else if (item.status === 'proposed') summary.items.proposed++;
    else if (item.status === 'idea') summary.items.idea++;
  });

  // Count Decisions
  tripState.decisions.forEach(d => {
    if (d.status === 'resolved') summary.decisions.resolved++;
    else summary.decisions.open++;
  });

  // Budget Health
  if (budget.perPersonTotal < budget.target - 200) summary.budgetHealth = 'under';
  else if (budget.perPersonTotal > budget.target + 200) summary.budgetHealth = 'over';

  return summary;
};

/**
 * Handles the logic for a user voting on a decision.
 * If all travelers have voted, it resolves the decision and updates linked items.
 */
export const handleVoteLogic = (
  currentTripState: TripData,
  decisionId: string,
  optionId: string,
  travelerId: string
): TripData => {
  const newState = { ...currentTripState };
  
  // Update decisions
  newState.decisions = newState.decisions.map(d => {
    if (d.id !== decisionId) return d;

    // 1. Add vote
    const newOptions = d.options.map(opt => {
      if (opt.id === optionId) {
        if (!opt.voters.includes(travelerId)) {
          return { ...opt, votes: opt.votes + 1, voters: [...opt.voters, travelerId] };
        }
      }
      return opt;
    });

    // 2. Check for resolution
    const totalVotes = newOptions.reduce((acc, curr) => acc + curr.votes, 0);
    const totalTravelers = newState.trip.travelers.length;
    let status = d.status;
    let winnerId = null;

    if (totalVotes >= totalTravelers) {
      status = 'resolved';
      // Determine winner (simple max votes)
      const sorted = [...newOptions].sort((a, b) => b.votes - a.votes);
      winnerId = sorted[0].id;
    }

    return { ...d, options: newOptions, status };
  });

  // 3. If resolved, update linked item
  const resolvedDecision = newState.decisions.find(d => d.id === decisionId && d.status === 'resolved');
  if (resolvedDecision && resolvedDecision.linkedItemId) {
    const winner = resolvedDecision.options.sort((a, b) => b.votes - a.votes)[0];
    
    // Update the linked item (generic search across all lists)
    const updateLinkedItem = (list: any[]) => {
      return list.map(item => {
        if (item.id === resolvedDecision.linkedItemId) {
          // Update cost and status
          // If the option has a specific cost, we assume it replaces the estimated cost
          return {
            ...item,
            status: 'agreed',
            estCostPerPerson: winner.estCost,
            notes: (item.notes ? item.notes + '\n' : '') + `[Decision Resolved: Selected ${winner.label}]`
          };
        }
        return item;
      });
    };

    newState.items.flights = updateLinkedItem(newState.items.flights);
    newState.items.hotels = updateLinkedItem(newState.items.hotels);
    newState.items.activities = updateLinkedItem(newState.items.activities);
  }

  return newState;
};
