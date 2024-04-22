import { useEffect } from "react";

import { Ion } from "cesium";

export const useCesiumIonTokenSetter = () => {
    useEffect(() => {
        Ion.defaultAccessToken = "***";
    }, [])
}