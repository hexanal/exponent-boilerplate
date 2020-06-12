export default state => {
  const store = {
    ...state
  };
  const staterized = {
    update: () => {
      const all = staterized.get();
      Object.keys( staterized.get() )
        .map(key => {
          if ( !all[key]._onchanges ) return;
          staterized.get(current)._onchanges.map(call);
        });
    },
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
        toggle: () => staterized.set(key, !staterized.get(key)),
        changed: fn => staterized[key]._onchanges.push(fn),
        get: () => store[key],
        set: val => staterized.set(key, val),
      };
    });

  return staterized;
}
