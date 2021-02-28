import { useState, useEffect } from "react";

const useSavedState = (initState?: any) => {
    const [state, setState] = useState(initState);
    const [savedState, setSavedState] = useState(initState);
    const [isSaved, setIsSaved] = useState(true)
    const setSaved = () => {
        setSavedState(state)
    }
    useEffect(() => {
        setIsSaved(state === savedState ? true : false)
    }, [state, savedState])


    return [state, setState, setSaved, isSaved];
};
export default useSavedState;
