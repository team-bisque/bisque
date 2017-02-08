import { login } from './auth';
import { setSettings } from './settings';

import {
  TAB_ALIAS_LOGIN,
  TAB_ALIAS_SAVE_SETTINGS
} from '../constants';

export default {
  [TAB_ALIAS_LOGIN]: login,
  [TAB_ALIAS_SAVE_SETTINGS] : setSettings
};
