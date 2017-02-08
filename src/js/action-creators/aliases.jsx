import { login } from './auth';
import { setSettings } from './settings';
import { addGreylist } from './greylist';

import {
  TAB_ALIAS_LOGIN,
  TAB_ALIAS_SAVE_SETTINGS,
  TAB_ALIAS_ADD_GREYLIST
} from '../constants';

export default {
  [TAB_ALIAS_LOGIN]: login,
  [TAB_ALIAS_SAVE_SETTINGS] : setSettings,
  [TAB_ALIAS_ADD_GREYLIST] : addGreylist
};
