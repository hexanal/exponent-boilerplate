/**
 * * if you don't want to use the middleware to augment all the component, use
 * * the Messaging object as an independent tool
 *
 * todo: find a way to improve the data flow somewhat?
 *
 */
export const Messaging = {
  subscribers: [],

  subscribe: (id, cb) => { Messaging.addSubscriber(id, cb); },
  dispatch: (event) => Messaging.dispatchToSubscribers(event),

  addSubscriber: (id, cb) => {
    Messaging.subscribers.push({
      id,
      cb,
    })
  },

  dispatchToSubscribers: (event) => {
    const eventId = event.id;
    const payload = event.payload;

    Messaging.subscribers.map(({id, cb}) => {
      if (id === eventId) return cb(payload);
    });
  }
};

const MessagingMiddleware = ({Component, props}) => {
  const { subscribe, dispatch } = Messaging;

  props.messaging = {
    subscribe,
    dispatch,
  };

  return props;
}

export default MessagingMiddleware;