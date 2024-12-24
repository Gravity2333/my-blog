import React from "react";
import useOutlet, { OutletContextTypes } from "../hooks/useOutlet";

export default React.memo(function Outlet(props: OutletContextTypes) {
  const outlet = useOutlet(props);
  return outlet
})
