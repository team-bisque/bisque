import { login } from './auth';
import { setSettings } from './status';
import { addGreylist, editGreylist, removeGreylist } from './greylist';

import {
  TAB_ALIAS_LOGIN,
  TAB_ALIAS_SAVE_SETTINGS,
  TAB_ALIAS_ADD_GREYLIST,
  TAB_ALIAS_EDIT_GREYLIST,
  TAB_ALIAS_REMOVE_GREYLIST
} from '../constants';

export default {
  [TAB_ALIAS_LOGIN]: login,
  [TAB_ALIAS_SAVE_SETTINGS] : setSettings,
  [TAB_ALIAS_ADD_GREYLIST] : addGreylist,
  [TAB_ALIAS_EDIT_GREYLIST] : editGreylist,
  [TAB_ALIAS_REMOVE_GREYLIST] : removeGreylist
};
