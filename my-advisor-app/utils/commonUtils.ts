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

export const getNextDays = (days: number, startDate: Date = new Date()) => {
    const result = [];
    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        result.push(date.toISOString().split('T')[0]);
    }
    return result;
};

export const encodeQueryData = (data: object) => {
    const str = JSON.stringify(data);
    return btoa(str);
};

export const decodeQueryData = (encodedData: string) => {
    const decodedStr = atob(encodedData);
    return JSON.parse(decodedStr);
};

export const encodeQueryDataString = (str: string) => {
    return btoa(str);
};

export const decodeQueryDataString = (encodedData: string) => {
    return atob(encodedData);

};