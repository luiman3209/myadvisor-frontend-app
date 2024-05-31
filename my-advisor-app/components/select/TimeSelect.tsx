// components/TimeSelect.tsx
import React from 'react';
import * as Select from '@radix-ui/react-select';

import './SelectStyles.css'; // Import necessary CSS for styling
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

interface TimeSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}

const TimeSelect: React.FC<TimeSelectProps> = ({ value, onChange, options, label }) => {
  return (
    <div className="shift-time-field">
      <label className="shift-time-label">{label}</label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="SelectTrigger w-[180px]">
          <Select.Value placeholder="Select Time" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Content className="SelectContent">
          <Select.Viewport>
            {options.map((time) => (
              <Select.Item key={time} value={time} className="SelectItem">
                <Select.ItemText>{time.slice(0, 2)}:{time.slice(2)}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default TimeSelect;
