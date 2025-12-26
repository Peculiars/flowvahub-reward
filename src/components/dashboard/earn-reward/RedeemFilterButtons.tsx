interface RedeemFilterButtonsProps {
    activeFilter: string;
    onFilterChange: (filter: string) => void;
}

const RedeemFilterButtons = ({ activeFilter, onFilterChange }: RedeemFilterButtonsProps) => {
  const filters = [
    { id: 'all', label: 'All Rewards', count: 8 },
    { id: 'unlocked', label: 'Unlocked', count: 0 },
    { id: 'locked', label: 'Locked', count: 7 },
    { id: 'coming', label: 'Coming Soon', count: 1 }
  ];

  return (
    <div className="flex gap-3 mb-6 mt-6">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`p-3 border-b-3 ${
            activeFilter === filter.id
              ? 'border-purple-600 cursor-pointer rounded-t-lg bg-purple-100 text-purple-600'
              : 'border-transparent cursor-pointer text-gray-600 rounded-t-lg hover:bg-purple-100'
          }`}
        >
          {filter.label} <span className="ml-1 text-sm">{filter.count}</span>
        </button>
      ))}
    </div>
  );
};

export default RedeemFilterButtons;