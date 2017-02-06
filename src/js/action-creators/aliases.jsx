import { login } from './auth';
import { setRoute } from './auth';

import {
  TAB_ALIAS_LOGIN
} from '../constants';

export default {
  [TAB_ALIAS_LOGIN]: login,
  'setRouteAlias': (route) => { setRoute(route) }
};
