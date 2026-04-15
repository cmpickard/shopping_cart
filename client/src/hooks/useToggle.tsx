import { useState } from "react";

function useToggle(initialState: boolean) {
  const [visibility, setVisibility] = useState(initialState);

  function toggle(value?: boolean) {
    if (typeof value === 'boolean') {
      setVisibility(value)
    } else {
      setVisibility(prev => !prev);
    }
  }

    return { visibility, toggle}
}

export default useToggle;