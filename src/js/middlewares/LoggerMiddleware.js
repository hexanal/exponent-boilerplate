import Logger from 'core/Logger';

const LoggerMiddleware = ({props}) => {
  props.logger = Logger;
  return props;
}

export default LoggerMiddleware;
