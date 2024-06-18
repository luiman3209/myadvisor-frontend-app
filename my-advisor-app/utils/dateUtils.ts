

// implement date utils using date-fns using UTC timezone

import { format, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';




export function formatDateToUTCString(date: Date, dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX") {
    const utcDate = toZonedTime(date, 'UTC');
    return format(utcDate, dateFormat);
}

