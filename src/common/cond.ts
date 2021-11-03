type Condition<T, V> = [T | boolean, V];

function cond<T, V>(conditions: Condition<T, V>[]): (value: T) => V {
  return (value: T) => {
    for (const condition of conditions) {
      if (typeof condition[0] === 'boolean' && condition[0]) {
        return condition[1];
      } else if (condition[0] === value) {
        return condition[1];
      }
    }

    throw new Error('cond error: no default condition provided');
  };
}

export default cond;
