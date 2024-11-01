import React from 'react';

/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/use-callback-ref/src/useCallbackRef.tsx
 */

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
function useCallbackReference<T extends (...arguments_: never[]) => unknown>(
  callback: T | undefined,
): T {
  const callbackReference = React.useRef(callback);

  React.useEffect(() => {
    callbackReference.current = callback;
  });

  // https://github.com/facebook/react/issues/19240
  return React.useMemo(
    () => ((...arguments_) => callbackReference.current?.(...arguments_)) as T,
    [],
  );
}

export { useCallbackReference as useCallbackRef };
