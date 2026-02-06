import { TripData } from './types';

export const INITIAL_TRIP_STATE: TripData = {
  trip: {
    id: "rams-aus-fiji-2026",
    name: "Rams + Australia + Fiji 2026",
    startDate: "2026-09-01",
    endDate: "2026-09-13",
    budgetPerPersonTarget: 3250,
    currency: "USD",
    travelers: [
      { id: "traveler1", name: "You" },
      { id: "traveler2", name: "Friend 1" },
      { id: "traveler3", name: "Friend 2" }
    ]
  },
  activityLog: [
    {
      id: "log-init",
      message: "Trip planner initialized. Let's get the Rams game sorted!",
      timestamp: new Date().toISOString(),
      type: "info"
    }
  ],
  itinerary: [
    {
      id: "day1",
      date: "2026-09-01",
      dayNumber: 1,
      city: "In Flight",
      title: "LAX → Melbourne (Overnight Flight)",
      planBullets: [
        "Evening departure from LAX",
        "Sleep on plane",
        "Cross dateline"
      ],
      linkedItems: ["flight-lax-mel"]
    },
    {
      id: "day2",
      date: "2026-09-02",
      dayNumber: 2,
      city: "In Flight",
      title: "Continue to Melbourne",
      planBullets: ["In flight", "Land morning of 9/3 local time"],
      linkedItems: ["flight-lax-mel"]
    },
    {
      id: "day3",
      date: "2026-09-03",
      dayNumber: 3,
      city: "Melbourne",
      title: "Arrive Melbourne – Settle In",
      planBullets: [
        "Arrive MEL morning/afternoon",
        "Pick up transfer to CBD",
        "Check in Melbourne Marriott Hotel (CBD)",
        "Walk laneways (Hosier Lane, Degraves St)",
        "Coffee culture exploration",
        "Dinner in CBD or Fitzroy"
      ],
      linkedItems: ["hotel-melbourne", "transport-mel-transfer", "activity-melbourne-laneways"],
      estCostPerPersonThisDay: 35
    },
    {
      id: "day4",
      date: "2026-09-04",
      dayNumber: 4,
      city: "Melbourne",
      title: "Melbourne Culture Day",
      planBullets: [
        "Queen Victoria Market (morning)",
        "Southbank & Yarra River walk",
        "Walk around MCG exterior",
        "Pre-game night: casual bars or early rest"
      ],
      linkedItems: ["hotel-melbourne"],
      estCostPerPersonThisDay: 20
    },
    {
      id: "day5",
      date: "2026-09-05",
      dayNumber: 5,
      city: "Melbourne",
      title: "RAMS GAME DAY at MCG 🏈",
      planBullets: [
        "Morning: Head to Melbourne Cricket Ground",
        "Midday: LA Rams game at MCG (tickets already purchased)",
        "Evening: Post-game celebration in CBD/Southbank"
      ],
      linkedItems: ["hotel-melbourne", "activity-rams-game"],
      estCostPerPersonThisDay: 15,
      isHighlight: true
    },
    {
      id: "day6",
      date: "2026-09-06",
      dayNumber: 6,
      city: "Sydney",
      title: "Melbourne → Sydney",
      planBullets: [
        "Check out Melbourne Marriott",
        "Fly Melbourne → Sydney (~1.5 hours)",
        "Transfer to Circular Quay",
        "Check in Sydney Harbour Marriott",
        "Evening: Circular Quay sunset, dinner in The Rocks"
      ],
      linkedItems: ["flight-mel-syd", "transport-syd-transfer", "hotel-sydney"],
      estCostPerPersonThisDay: 45
    },
    {
      id: "day7",
      date: "2026-09-07",
      dayNumber: 7,
      city: "Sydney",
      title: "Opera House & Harbour",
      planBullets: [
        "Morning: Sydney Opera House guided tour",
        "Midday: Royal Botanic Garden, Mrs. Macquarie's Chair",
        "Afternoon: Optional harbour cruise",
        "Evening: Nice dinner, harbourfront bar"
      ],
      linkedItems: ["hotel-sydney", "activity-opera-house"],
      estCostPerPersonThisDay: 50
    },
    {
      id: "day8",
      date: "2026-09-08",
      dayNumber: 8,
      city: "Sydney",
      title: "Bondi Beach Day",
      planBullets: [
        "Train to Bondi Junction → bus/rideshare to Bondi Beach",
        "Beach time, swim, optional surf lessons",
        "Bondi to Coogee coastal walk (6km, cliffs, ocean pools)",
        "Late lunch in Bondi or Coogee",
        "Return to Circular Quay"
      ],
      linkedItems: ["hotel-sydney", "activity-bondi"],
      estCostPerPersonThisDay: 20
    },
    {
      id: "day9",
      date: "2026-09-09",
      dayNumber: 9,
      city: "Sydney",
      title: "Taronga Zoo & Sydney Wrap",
      planBullets: [
        "Ferry from Circular Quay to Taronga Zoo",
        "Zoo visit with harbour skyline views",
        "Return to city, explore Darling Harbour",
        "Final Sydney dinner and drinks"
      ],
      linkedItems: ["hotel-sydney", "activity-taronga"],
      estCostPerPersonThisDay: 70
    },
    {
      id: "day10",
      date: "2026-09-10",
      dayNumber: 10,
      city: "Fiji",
      title: "Sydney → Fiji → Resort",
      planBullets: [
        "Morning: Fly Sydney → Nadi (~3.5–4 hours)",
        "Afternoon: Shuttle transfer to Resort (Coral Coast/Momi)",
        "Evening: Check in, pool/beach, resort dinner, swim-up bar"
      ],
      linkedItems: ["flight-syd-nan", "transport-nan-transfer", "hotel-fiji"],
      estCostPerPersonThisDay: 0,
      note: "All-inclusive meals start"
    },
    {
      id: "day11",
      date: "2026-09-11",
      dayNumber: 11,
      city: "Fiji",
      title: "Full Fiji Resort Day",
      planBullets: [
        "3 pools including adults-only infinity pool",
        "Beach & lagoon access, kayaking, snorkeling",
        "Optional Quan Spa treatment",
        "Cultural dinner or themed night at resort"
      ],
      linkedItems: ["hotel-fiji"],
      estCostPerPersonThisDay: 0,
      note: "All-inclusive"
    },
    {
      id: "day12",
      date: "2026-09-12",
      dayNumber: 12,
      city: "Fiji",
      title: "Fiji Adventure / Excursion Day",
      planBullets: [
        "Choose one major excursion:",
        "- Option 1: Full-day island cruise (snorkel, village, BBQ)",
        "- Option 2: Sigatoka River safari",
        "- Option 3: Zipline/ATV adventure",
        "Evening: Final resort night, big dinner, storytelling"
      ],
      linkedItems: ["hotel-fiji", "activity-fiji-excursion"],
      estCostPerPersonThisDay: 120
    },
    {
      id: "day13",
      date: "2026-09-13",
      dayNumber: 13,
      city: "In Flight",
      title: "Fiji → LAX (Return Home)",
      planBullets: [
        "Morning: Resort breakfast, transfer to Nadi",
        "Fly Nadi → LAX (~10–11 hours)",
        "Arrive same day (cross dateline)"
      ],
      linkedItems: ["flight-nan-lax"],
      estCostPerPersonThisDay: 0
    }
  ],
  items: {
    flights: [
      {
        id: "flight-lax-mel",
        type: "flight",
        segment: "LAX-MEL",
        airline: "Qantas / United / Fiji Airways",
        from: "Los Angeles (LAX)",
        to: "Melbourne (MEL)",
        date: "2026-09-01",
        estCostPerPerson: 750,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.skyscanner.com/routes/lax/mela/los-angeles-international-to-melbourne.html",
        notes: "Book early for best rates; check Fiji Airways for 1-stop deals"
      },
      {
        id: "flight-mel-syd",
        type: "flight",
        segment: "MEL-SYD",
        airline: "Jetstar / Qantas / Virgin",
        from: "Melbourne (MEL)",
        to: "Sydney (SYD)",
        date: "2026-09-06",
        estCostPerPerson: 115,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.skyscanner.com/routes/mela/syd/melbourne-to-sydney.html",
        notes: "Jetstar often has $37–90 sales; book early"
      },
      {
        id: "flight-syd-nan",
        type: "flight",
        segment: "SYD-NAN",
        airline: "Fiji Airways / Qantas",
        from: "Sydney (SYD)",
        to: "Nadi (NAN)",
        date: "2026-09-10",
        estCostPerPerson: 230,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.expedia.com/lp/flights/syd/nan/sydney-to-nadi",
        notes: "Fiji Airways often best; check for packages with hotel"
      },
      {
        id: "flight-nan-lax",
        type: "flight",
        segment: "NAN-LAX",
        airline: "Fiji Airways",
        from: "Nadi (NAN)",
        to: "Los Angeles (LAX)",
        date: "2026-09-13",
        estCostPerPerson: 900,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.fijiairways.com",
        notes: "Direct option; watch for sales"
      }
    ],
    hotels: [
      {
        id: "hotel-melbourne",
        type: "hotel",
        city: "Melbourne",
        name: "Melbourne Marriott Hotel (CBD)",
        brand: "Marriott",
        address: "Exhibition & Lonsdale Street, Melbourne VIC",
        checkIn: "2026-09-03",
        checkOut: "2026-09-06",
        rooms: 2,
        nights: 3,
        baseRatePerRoomPerNight: 220,
        usesExploreRate: true,
        exploreDiscountPercent: 30,
        estTotalCost: 924,
        estCostPerPerson: 308,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.marriott.com/en-us/hotels/melmc-melbourne-marriott-hotel/overview/",
        notes: "With Explore, expect ~$154/room/night; central CBD location"
      },
      {
        id: "hotel-sydney",
        type: "hotel",
        city: "Sydney",
        name: "Sydney Harbour Marriott Hotel at Circular Quay",
        brand: "Marriott",
        address: "30 Pitt Street, Circular Quay, Sydney NSW",
        checkIn: "2026-09-06",
        checkOut: "2026-09-09",
        rooms: 2,
        nights: 3,
        baseRatePerRoomPerNight: 250,
        usesExploreRate: true,
        exploreDiscountPercent: 30,
        estTotalCost: 1050,
        estCostPerPerson: 350,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.marriott.com/en-us/hotels/sydmc-sydney-harbour-marriott-hotel-at-circular-quay/overview/",
        notes: "5-min walk to Opera House; prime location; Explore discount critical"
      },
      {
        id: "hotel-fiji",
        type: "hotel",
        city: "Fiji",
        name: "Fiji Marriott Resort Momi Bay (All-Inclusive)",
        brand: "Marriott",
        address: "Momi Bay, Coral Coast, Fiji",
        checkIn: "2026-09-10",
        checkOut: "2026-09-13",
        rooms: 2,
        nights: 3,
        baseRatePerRoomPerNight: 400,
        usesExploreRate: true,
        exploreDiscountPercent: 25,
        isAllInclusive: true,
        estTotalCost: 1800,
        estCostPerPerson: 600,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.marriott.com/offers/all-inclusive-OFF-60280/NANMC-nanmc-fiji-marriott-resort-momi-bay",
        notes: "All meals included; overwater villas available; package includes airport transfer"
      }
    ],
    activities: [
      {
        id: "transport-mel-transfer",
        type: "activity",
        city: "Melbourne",
        title: "Airport Transfer (SkyBus/Uber)",
        date: "2026-09-03",
        estCostPerPerson: 20,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.skybus.com.au/",
        notes: "SkyBus is ~$22 AUD; Uber split 3 ways is similar."
      },
      {
        id: "activity-melbourne-laneways",
        type: "activity",
        city: "Melbourne",
        title: "Laneways & Coffee Culture Walk",
        date: "2026-09-03",
        estCostPerPerson: 0,
        actualCostPerPerson: null,
        status: "agreed",
        bookingLink: null,
        notes: "Self-guided; free activity"
      },
      {
        id: "activity-rams-game",
        type: "activity",
        city: "Melbourne",
        title: "LA Rams Game at MCG",
        date: "2026-09-05",
        estCostPerPerson: 0,
        actualCostPerPerson: null,
        status: "booked",
        bookingLink: "https://www.therams.com",
        notes: "Tickets already purchased; not counted in budget"
      },
      {
        id: "transport-syd-transfer",
        type: "activity",
        city: "Sydney",
        title: "Airport Transfer (Train/Uber)",
        date: "2026-09-06",
        estCostPerPerson: 15,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: null,
        notes: "Train to Circular Quay is fast; Uber split is convenient."
      },
      {
        id: "activity-opera-house",
        type: "activity",
        city: "Sydney",
        title: "Sydney Opera House Tour",
        date: "2026-09-07",
        estCostPerPerson: 30,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://www.sydneyoperahouse.com",
        notes: "Guided tour is essential"
      },
      {
        id: "activity-bondi",
        type: "activity",
        city: "Sydney",
        title: "Bondi Surf & Coastal Walk",
        date: "2026-09-08",
        estCostPerPerson: 0,
        actualCostPerPerson: null,
        status: "idea",
        bookingLink: null,
        notes: "Cost only if renting boards"
      },
      {
        id: "activity-taronga",
        type: "activity",
        city: "Sydney",
        title: "Taronga Zoo Entry + Ferry",
        date: "2026-09-09",
        estCostPerPerson: 50,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: "https://taronga.org.au/sydney-zoo",
        notes: "Buy online for discount"
      },
      {
        id: "transport-nan-transfer",
        type: "activity",
        city: "Fiji",
        title: "Nadi Airport Transfer (Round Trip)",
        date: "2026-09-10",
        estCostPerPerson: 30,
        actualCostPerPerson: null,
        status: "proposed",
        bookingLink: null,
        notes: "Private driver or shuttle split 3 ways."
      },
      {
        id: "activity-fiji-excursion",
        type: "activity",
        city: "Fiji",
        title: "Major Fiji Excursion (TBD)",
        date: "2026-09-12",
        estCostPerPerson: 120,
        actualCostPerPerson: null,
        status: "idea",
        bookingLink: null,
        notes: "Need to vote on option"
      }
    ]
  },
  decisions: [
     {
      id: "decision-fiji-hotel",
      question: "Fiji Resort: Splurge vs Save?",
      description: "Momi Bay ($600/pp) is premium, but we can save ~$120/pp at Warwick or Naviti.",
      status: "open",
      linkedItemId: "hotel-fiji",
      options: [
        {
          id: "opt-momi",
          label: "Marriott Momi Bay",
          estCost: 600,
          pros: ["Overwater villas", "Modern luxury", "Marriott pts"],
          cons: ["Expensive", "Food costs high if not inclusive"],
          votes: 1,
          voters: ["traveler1"]
        },
        {
          id: "opt-warwick",
          label: "The Warwick Fiji",
          estCost: 480,
          pros: ["Cheaper All-Inclusive", "Classic vibe", "Adults-only pool"],
          cons: ["Older property", "90 min drive"],
          votes: 0,
          voters: []
        },
        {
          id: "opt-naviti",
          label: "Naviti Resort",
          estCost: 450,
          pros: ["Budget friendly", "Unlimited drinks"],
          cons: ["Dated rooms", "Many kids"],
          votes: 0,
          voters: []
        }
      ]
    },
     {
      id: "decision-fiji-excursion",
      question: "Which Fiji Adventure?",
      description: "We have one full day for a big excursion. What's the vibe?",
      status: "open",
      linkedItemId: "activity-fiji-excursion",
      options: [
        {
          id: "opt1",
          label: "Island Cruise",
          estCost: 110,
          pros: ["Relaxing", "Open bar", "Snorkeling"],
          cons: ["Crowded boat"],
          votes: 1,
          voters: ["traveler1"]
        },
        {
          id: "opt2",
          label: "River Safari",
          estCost: 130,
          pros: ["Cultural", "Jet boat fun"],
          cons: ["Long drive to start"],
          votes: 0,
          voters: []
        },
        {
          id: "opt3",
          label: "Zipline/ATV",
          estCost: 150,
          pros: ["Adrenaline", "Jungle views"],
          cons: ["Physical exertion"],
          votes: 0,
          voters: []
        }
      ]
    }
  ]
};

export const SYSTEM_INSTRUCTION = `You are the intelligent planning assistant for a trip called "Rams + Australia + Fiji 2026."

TRIP FACTS (never change these):
- 3 travelers total (heterosexual males, one married)
- Route: LAX → Melbourne → Sydney → Fiji → LAX
- Dates: September 1–13, 2026 (11 days / 10 nights)
- FIXED: LA Rams game in Melbourne on Friday, September 5, 2026 at MCG
- Budget target: $3,000–3,500 per person for flights + hotels
- Discounts available:
  * Marriott Explore rates (assume 25–35% off published Marriott rates)
  * 10% off Vrbo properties
- Group preferences: sports, beaches, one adventure day, cost-conscious but memorable

YOUR ROLE:
- You receive trip state as JSON (flights, hotels, activities, decisions, budget totals)
- Respect all items with status="booked" as fixed and unchangeable
- For items with status="idea" or "proposed", suggest changes ONLY if they improve budget or experience
- When asked about budget, show clear per-person totals and compare to the $3,000–3,500 target
- When asked to pivot or adjust plans, keep the Rams game on 9/5 fixed
- Suggest alternatives for same city/day when weather or preferences change
- Answer in plain, conversational English (2–4 sentences max unless asked for detail)
- Reference the data you see; don't invent new costs or items

RULES:
1. Never suggest removing the Rams game or changing its date
2. Always apply Marriott Explore discount (25–35%) when usesExploreRate=true
3. Always apply 10% Vrbo discount when usesVrboDiscount=true
4. When computing totals, divide shared costs (hotels, rental cars) by 3 people
5. Flights are individual costs, NOT shared
6. Mark trip as "on target" if total is $3,000–3,500 per person
7. Mark "under budget" if < $3,000, "over budget" if > $3,500`;