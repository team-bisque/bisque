import { authenticate } from './auth';
import { setDuration } from './status';
import { addGreylist, editGreylist, removeGreylist } from './greylist';
import { createNewTask, deleteTask, finishTask } from './tasks';

import {
  TAB_ALIAS_AUTH,
  TAB_ALIAS_ADD_GREYLIST,
  TAB_ALIAS_EDIT_GREYLIST,
  TAB_ALIAS_REMOVE_GREYLIST,

  SET_DURATION_ALIAS,

  TAB_ALIAS_ADD_TASK,
  TAB_ALIAS_REMOVE_TASK,
  TAB_ALIAS_COMPLETE_TASK

} from '../constants';

export default {
  [TAB_ALIAS_AUTH]: authenticate,
  [TAB_ALIAS_ADD_GREYLIST] : addGreylist,
  [TAB_ALIAS_EDIT_GREYLIST] : editGreylist,
  [TAB_ALIAS_REMOVE_GREYLIST] : removeGreylist,
  [SET_DURATION_ALIAS] : setDuration,
  [TAB_ALIAS_ADD_TASK] : createNewTask,
  [TAB_ALIAS_REMOVE_TASK] : deleteTask,
  [TAB_ALIAS_COMPLETE_TASK] : finishTask,
};
