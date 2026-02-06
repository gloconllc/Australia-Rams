export interface Traveler {
  id: string;
  name: string;
}

export interface ItineraryDay {
  id: string;
  date: string;
  dayNumber: number;
  city: string;
  title: string;
  planBullets: string[];
  linkedItems: string[];
  estCostPerPersonThisDay?: number;
  isHighlight?: boolean;
  note?: string;
}

export type ItemStatus = 'idea' | 'proposed' | 'agreed' | 'booked' | 'cancelled';

export interface BaseItem {
  id: string;
  status: ItemStatus;
  estCostPerPerson?: number; // Calculated helper field
  actualCostPerPerson?: number | null;
  bookingLink?: string | null;
  notes?: string;
}

export interface FlightItem extends BaseItem {
  type: 'flight';
  segment: string;
  airline: string;
  from: string;
  to: string;
  date: string;
  estCostPerPerson: number; // Flights are per person
}

export interface HotelItem extends BaseItem {
  type: 'hotel';
  city: string;
  name: string;
  brand: string;
  address: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  nights: number;
  baseRatePerRoomPerNight: number;
  usesExploreRate: boolean;
  exploreDiscountPercent?: number;
  estTotalCost: number;
  estCostPerPerson: number; // Helper: total / 3
  isAllInclusive?: boolean;
}

export interface ActivityItem extends BaseItem {
  type: 'activity';
  city: string;
  title: string;
  date: string;
  estCostPerPerson: number;
}

export interface DecisionOption {
  id: string;
  label: string;
  estCost: number;
  pros: string[];
  cons: string[];
  votes: number;
  voters: string[]; // Traveler IDs
}

export interface Decision {
  id: string;
  question: string;
  description: string;
  status: 'open' | 'resolved';
  options: DecisionOption[];
  linkedItemId?: string;
}

export interface TripBudgetState {
  flightTotal: number;
  hotelTotal: number;
  activityTotal: number;
  grandTotal: number;
  perPersonTotal: number;
  target: number;
}

export interface TripStatusSummary {
  items: {
    total: number;
    booked: number;
    agreed: number;
    proposed: number;
    idea: number;
  };
  decisions: {
    total: number;
    open: number;
    resolved: number;
  };
  budgetHealth: 'under' | 'on-track' | 'over';
}

export interface ActivityLogEntry {
  id: string;
  message: string;
  timestamp: string;
  type: 'decision' | 'booking' | 'info';
}

export interface TripData {
  trip: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    budgetPerPersonTarget: number;
    currency: string;
    travelers: Traveler[];
  };
  itinerary: ItineraryDay[];
  items: {
    flights: FlightItem[];
    hotels: HotelItem[];
    activities: ActivityItem[];
  };
  decisions: Decision[];
  activityLog: ActivityLogEntry[]; // New field for the "Feed"
}
