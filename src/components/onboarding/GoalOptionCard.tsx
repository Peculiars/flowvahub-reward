import type { GoalOption } from '../../types';

interface GoalOptionCardProps {
  option: GoalOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const GoalOptionCard = ({ option, isSelected, onSelect }: GoalOptionCardProps) => {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className={`
        w-full text-left p-6 rounded-2xl border-2 transition-all cursor-pointer duration-200
        ${
          isSelected
            ? 'border-purple-600 border-2 bg-purple-50'
            : 'border-gray-200 hover:border-purple-300 bg-white'
        }
      `}
    >
      <h3 className="font-semibold text-gray-700 mb-2">
        {option.title}
      </h3>
      <p className="text-sm text-gray-600">
        {option.description}
      </p>
    </button>
  );
};