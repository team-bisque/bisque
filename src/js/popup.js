import React from "react";
import { render } from "react-dom";

import "../css/popup.css";
import Greeting from "./popup/greeting_component";
import Alarm from "./component/alarm"

render(
  <Alarm/>,
  window.document.getElementById("app-container")
);
