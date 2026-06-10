interface LivePulseProps {
  color?: 'red' | 'green';
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = { sm: 'h-2 w-2', md: 'h-3 w-3', lg: 'h-4 w-4' };
const colorMap = {
  red: 'bg-[#DC2626]',
  green: 'bg-[#15803D]',
};

export const LivePulse = ({ color = 'red', size = 'md' }: LivePulseProps) => (
  <span
    className={`inline-block animate-pulse rounded-full ${sizeMap[size]} ${colorMap[color]}`}
    aria-hidden="true"
  />
);
