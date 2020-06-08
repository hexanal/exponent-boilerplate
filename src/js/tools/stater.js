export default state => {
  const store = {
    ...state
  };
  const staterized = {
    set: (key, val) => {
      store[key] = val;
      staterized[key]._onchanges.map(fn => fn(val));
      return {
        get: () => store[key],
        and: fn => fn(store[key])
      };
    },
    get: key => key ? store[key] : store
  };

  Object.keys(state)
    .map(key => {
      staterized[key] = {
        _onchanges: [],
        toggle: (key) => staterized.set(key, !staterized.get(key)),
        changed: fn => staterized[key]._onchanges.push(fn),
        get: () => store[key],
        set: val => staterized.set(key, val),
      };
    });

  return staterized;
}
