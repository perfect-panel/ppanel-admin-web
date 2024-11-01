import React from 'react';

import { useCallbackRef } from '@/hooks/use-callback-ref';

/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/use-controllable-state/src/useControllableState.tsx
 */

type UseControllableStateParameters<T> = {
  defaultProp?: T | undefined;
  onChange?: (state: T) => void;
  prop?: T | undefined;
};

type SetStateFunction<T> = (previousState?: T) => T;

function useUncontrolledState<T>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParameters<T>, 'prop'>) {
  const uncontrolledState = React.useState<T | undefined>(defaultProp);
  const [value] = uncontrolledState;
  const previousValueReference = React.useRef(value);
  const handleChange = useCallbackRef(onChange);

  React.useEffect(() => {
    if (previousValueReference.current !== value) {
      handleChange(value as T);
      previousValueReference.current = value;
    }
  }, [value, previousValueReference, handleChange]);

  return uncontrolledState;
}
function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParameters<T>) {
  const [uncontrolledProperty, setUncontrolledProperty] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProperty;
  const handleChange = useCallbackRef(onChange);

  const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFunction<T>;
        const value = typeof nextValue === 'function' ? setter(prop) : nextValue;

        if (value !== prop) handleChange(value as T);
      } else {
        setUncontrolledProperty(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProperty, handleChange],
  );

  return [value, setValue] as const;
}

export { useControllableState };
