import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp"; // if can not find in node_modules -> call by ModuleFederationPlugin

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  });

  return <div ref={ref}></div>;
};
