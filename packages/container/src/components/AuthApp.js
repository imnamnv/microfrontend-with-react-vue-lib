import React, { useRef, useEffect } from "react";
import { mount } from "auth/AuthApp"; // if can not find in node_modules -> call by ModuleFederationPlugin
import { useHistory } from "react-router-dom";

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      //click link on marketing will sync to container
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) history.push(nextPathname);
      },
      initialPath: history.location.pathname,
    });
    history.listen(onParentNavigate); //click link on container will sync to marketing
  }, []);

  return <div ref={ref}></div>;
};
