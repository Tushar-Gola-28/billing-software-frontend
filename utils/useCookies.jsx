export const getStorageData = (key, nestedKey = null) => {
    if (typeof window === 'undefined') {
        // Not in a browser environment
        return null;
    }

    try {
        const raw = localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : null;

        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            return nestedKey ? parsed[nestedKey] : parsed;
        }

        return parsed;
    } catch (error) {
        console.error(`Error getting data from localStorage for key "${key}":`, error);
        return null;
    }
};