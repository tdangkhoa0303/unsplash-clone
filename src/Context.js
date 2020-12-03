import React, { useState, useEffect } from "react";

const Context = React.createContext(null);

export function Provider(props) {
  const [isMobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => setMobile(window.innerWidth < 768);

  return (
    <Context.Provider
      value={{
        isMobile,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
