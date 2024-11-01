import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
}

function TagInput({ value = [], onChange, placeholder }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    setTags(value.map((tag) => tag.trim()).filter((tag) => tag) || []);
  }, [value]);

  function addTag() {
    if (inputValue.trim()) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue('');
      if (onChange) {
        onChange(newTags);
      }
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    } else if (event.key === 'Backspace' && inputValue === '') {
      event.preventDefault();
      handleRemoveTag(tags.length - 1);
    }
  }

  function handleRemoveTag(index: number) {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    if (onChange) {
      onChange(newTags);
    }
  }

  return (
    <div className='flex min-h-9 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-primary'>
      {tags.map((tag, index) => (
        <Badge
          key={index}
          variant='outline'
          className='flex items-center gap-2 border-primary bg-primary/10'
        >
          {tag}
          <Icon icon='uil:multiply' onClick={() => handleRemoveTag(index)} />
        </Badge>
      ))}
      <Input
        className='h-full min-w-48 flex-1 border-none bg-transparent p-0 shadow-none !ring-0'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TagInput;
