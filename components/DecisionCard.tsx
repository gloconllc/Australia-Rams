import React from 'react';
import { Decision, Traveler } from '../types';

interface DecisionCardProps {
  decision: Decision;
  currentTravelerId: string;
  travelers: Traveler[];
  onVote: (decisionId: string, optionId: string, travelerId: string) => void;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ decision, currentTravelerId, travelers, onVote }) => {
  const isResolved = decision.status === 'resolved';

  // Sort options by vote count descending for a "Leaderboard" feel
  const sortedOptions = [...decision.options].sort((a, b) => b.votes - a.votes);
  const totalVotes = decision.options.reduce((acc, curr) => acc + curr.votes, 0);
  const maxVotes = sortedOptions[0].votes;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden mb-6">
      {/* Header */}
      <div className="p-5 bg-gradient-to-br from-indigo-50 to-white border-b border-indigo-50">
        <div className="flex justify-between items-start gap-4">
             <div>
                 <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide">Group Decision</span>
                 <h3 className="text-lg font-bold text-gray-900 mt-1">{decision.question}</h3>
                 <p className="text-sm text-gray-600 mt-1">{decision.description}</p>
             </div>
             <div className="shrink-0">
                {isResolved ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">✓ RESOLVED</span>
                ) : (
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">{totalVotes}/3 Voted</span>
                )}
             </div>
        </div>
      </div>

      {/* Options List (Poll Style) */}
      <div className="p-2">
        {sortedOptions.map(option => {
          const hasVoted = option.voters.includes(currentTravelerId);
          const isWinner = isResolved && option.votes === maxVotes;
          const votePercent = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;

          return (
            <div key={option.id} className={`relative p-3 rounded-lg mb-2 transition-all ${isWinner ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50 border border-transparent'}`}>
              
              {/* Progress Bar Background */}
              {totalVotes > 0 && !isResolved && (
                  <div className="absolute left-0 top-0 bottom-0 bg-indigo-50 rounded-lg transition-all duration-500 opacity-50" style={{ width: `${votePercent}%` }}></div>
              )}
              
              <div className="relative flex justify-between items-center">
                  <div className="flex-1">
                      <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-900">{option.label}</h4>
                          {isWinner && <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold">WINNER</span>}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">Est: ${option.estCost} • {option.pros[0]}</div>
                      
                      {/* Voters Avatars */}
                      {option.voters.length > 0 && (
                          <div className="flex -space-x-1 mt-2">
                              {option.voters.map(vid => {
                                  const t = travelers.find(tr => tr.id === vid);
                                  return (
                                      <div key={vid} className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white" title={t?.name}>
                                          {t?.name.charAt(0)}
                                      </div>
                                  );
                              })}
                          </div>
                      )}
                  </div>

                  <div className="ml-4">
                      {isResolved ? (
                          <div className="text-xl font-bold text-gray-400">{option.votes}</div>
                      ) : (
                          <button
                            onClick={() => onVote(decision.id, option.id, currentTravelerId)}
                            disabled={hasVoted}
                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                                hasVoted 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600'
                            }`}
                          >
                            {hasVoted ? 'Voted' : 'Vote'}
                          </button>
                      )}
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DecisionCard;
