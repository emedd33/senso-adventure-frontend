import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function useOwner(initOwner?: string) {
  const location = useLocation();
  const [state, setState] = useState(initOwner);
  useEffect(() => {
    let newOwner = location.pathname.split("/")[2];
    setState(newOwner);
  }, [location]);

  return state;
}
export default useOwner;
