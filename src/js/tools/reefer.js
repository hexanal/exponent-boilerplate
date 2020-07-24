import stepper from 'tools/stepper';

const REST_FRAMES_THRESHOLD = 50;

// TODO extract reefer to be targeting ONE prop at a time; while running the raf?
export default function reefer(initialProps, initialSpring = { stiffness: 250, damping: 25 }) {
  const frameCallbacks = [];
  const endCallbacks = [];
  const interpolated = { ...initialProps };
  const props = { ...initialProps };
  const springPerProp = Object.keys(props).reduce((acc, key) => {
    acc[key] = { ...initialSpring };
    return acc;
  }, {});

  Object.keys(props).forEach(key => {
    framer(key, props[key], interpolated[key]);
  });

  function framer(key, target, start = 0, velocity = 0) {
    if (typeof target === 'string') return;
    if (typeof target !== 'number') return;
    if (typeof start !== 'number') return;

    const [nextValue, nextVelocity] = stepper(
      start,
      velocity,
      target,
      springPerProp[key].stiffness,
      springPerProp[key].damping
    );

    interpolated[key] = nextValue;

    const progress = Math.min(1, start / target);
    frameCallbacks.map(fn => fn(interpolated, progress) );

    // if ( "AT REST ") {
    //   endCallbacks.map(fn => fn(key) );
    // }

    requestAnimationFrame(function() {
      framer(key, props[key], nextValue, nextVelocity);
    });
  }

  function run({newProps, spring, useRelativeValues}) {
    Object.keys(newProps).forEach(key => {
      if ( typeof newProps[key] !== 'number' ) {
        // treat as simple variable
        interpolated[key] = newProps[key];
        return;
      }

      springPerProp[key].restStack = []; // reset the rest stack...

      if ( spring ) {
        springPerProp[key].stiffness = spring.stiffness; // set new spring config
        springPerProp[key].damping = spring.damping;
      }

      props[key] = useRelativeValues
        ? props[key] + newProps[key]
        : newProps[key];
    });

    return methods;
  }

  const methods = {
    get: () => props,

    getInterpolated: () => interpolated,

    instantSet: props => {
      Object.keys(props).forEach(key => {
        interpolated[key] = props[key];
      });
    },

    set: (props, config) => run({
      newProps: props,
      spring: config
    }),

    relative: {
      set: (props, config) => run({
        newProps: props,
        spring: config,
        useRelativeValues: true
      }),
    },

    onFrame: fn => {
      fn(interpolated);
      frameCallbacks.push(fn);
      return methods;
    },

    // onEnd: fn => {
    //   endCallbacks.push(fn);
    //   return methods;
    // },
  };

  return methods;
};
