import React, { useCallback, useEffect, useState } from 'react';

type ChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
type KeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => void;
type FocusHandler = (event: React.FocusEvent<HTMLInputElement>) => void;

function useInlineEditing(
  initialValue: string,
  onApply: (value: string) => void,
): [string, ChangeHandler, KeyDownHandler, FocusHandler, FocusHandler] {
  const [editingValue, setEditingValue] = useState(initialValue);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.currentTarget.value);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      event.currentTarget.blur();
    }
  };

  const onBlurHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim() === '') {
      setEditingValue(initialValue);
    } else {
      onApply(event.currentTarget.value);
    }
  }, [onApply]);

  const onFocusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  useEffect(() => {
    if (initialValue !== editingValue) {
      setEditingValue(initialValue);
    }
  }, [initialValue]);

  return [editingValue, onChangeHandler, onKeyDownHandler, onBlurHandler, onFocusHandler];
}

export default useInlineEditing;
