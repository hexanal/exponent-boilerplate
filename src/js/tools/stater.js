export default state => {
  const store = {
    ...state
  };
  const staterized = {
    get: () => store
  };

  Object.keys(state)
    .map(key => {
      staterized[key] = {
        _onchanges: [],
        changed: fn => staterized[key]._onchanges.push(fn),
        get: () => store[key],
        set: val => {
          store[key] = val;
          staterized[key]._onchanges.map(fn => fn(val));
          return {
            get: () => store[key],
            and: fn => fn(store[key])
          };
        }
      };
    });

  return staterized;
}
