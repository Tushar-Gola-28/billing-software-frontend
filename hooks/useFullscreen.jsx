// hooks/useFullscreen.js
import { useCallback } from "react";

const useFullscreen = () => {
    const requestFullscreen = useCallback(() => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }, []);

    return requestFullscreen;
};

export { useFullscreen };
