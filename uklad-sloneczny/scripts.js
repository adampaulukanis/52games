"use strict";

if (window.location.search.substr(1) === "debug") {
  const styleElem = document.head.appendChild(document.createElement("style"));
  styleElem.innerHTML = `
#earth::before {
  content: "";
  width: 60px;
  height: 60px;
  border: 1px dotted red;
  display: inline-block;
  border-radius: 50%;
  transform: translate(-40%, -42%);
}
#sun::before {
  content: "";
  width: 550px;
  height: 550px;
  border: 1px dotted red;
  display: inline-block;
  border-radius: 50%;
  transform: translate(-32%, -34%);
}`;
}
