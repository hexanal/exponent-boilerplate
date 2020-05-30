// todo: this one's more like a full-featured package
// todo: might try localForage lib to maybe have something sturdier

const Storage = {
  switch: id => {
    const flag = !Storage.flag(id);
    Storage.set(id, flag);

    return flag;
  },

  flag: id => (window.localStorage.getItem(id) > 0),

  set: (id, value) => {
    const valueToSet = Storage.boolToBinaryFlag(value);
    window.localStorage.setItem(id, valueToSet);
  },

  get: (id, fallback = null) => {
    const stored = window.localStorage.getItem(id);
    if (!stored && typeof fallback !== 'null' && fallback !== 'undefined') return fallback;
    const item = Storage.binaryToBoolFlag( window.localStorage.getItem(id) );
    return item;
  },

  binaryToBoolFlag: val => {
    const isBinary = val === 1 || val === 0;
    return isBinary
      ? (val === 1)
      : val;
  },

  boolToBinaryFlag: val => {
    const isBool = typeof val === 'boolean';
    return isBool
      ? (val ? 1 : 0)
      : val;
  }
};

export default Storage;
