import { allTimes } from "./constants";

export function transformTime(value: string) {
    // Ensure the input is a string and has exactly 4 characters
    if (value.length === 4) {
        // Insert a colon between the second and third characters
        return value.slice(0, 2) + ':' + value.slice(2);
    } else {
        // Handle invalid input
        throw new Error("Invalid input. The input should be a 4-character string.");
    }
};


export const calculateEndTimes = (start: string) => {
    const startIndex = allTimes.indexOf(start);
    if (startIndex === -1) return [];
    const maxEndIndex = Math.min(startIndex + 16, allTimes.length); // 16 half-hour increments = 8 hours
    return allTimes.slice(startIndex + 1, maxEndIndex + 1);
};