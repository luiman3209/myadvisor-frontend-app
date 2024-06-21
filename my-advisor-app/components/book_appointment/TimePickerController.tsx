import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getNextDays } from "@/utils/commonUtils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import TimePickerGrid from "./TimePickerGrid";
import { getFreeWindows } from "@/services/appointmentService";


interface TimePickerControllerProps {
    advisorId: number;
    selectedDay: string | null;
    selectedTime: string | null;
    setSelectedDay: (day: string | null) => void;
    setSelectedTime: (time: string | null) => void;
    initiallyExpanded?: boolean;

}




const TimePickerController: React.FC<TimePickerControllerProps> = ({
    advisorId,
    selectedDay,
    selectedTime,
    setSelectedDay,
    setSelectedTime,
    initiallyExpanded

}) => {

    const [expanded, setExpanded] = useState<boolean>(initiallyExpanded ?? false);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [days, setDays] = useState<string[]>(getNextDays(5));
    const [loadingTimes, setLoadingTimes] = useState<boolean>(false);
    const [availableTimes, setAvailableTimes] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        fetchAvailableTimes(days);
    }, []);

    const fetchAvailableTimes = async (newDays: string[]) => {
        setLoadingTimes(true);
        try {
            const startDate = newDays[0];
            const endDate = newDays[newDays.length - 1].concat('T23:59:59Z');
            const times = await getFreeWindows(advisorId, startDate, endDate);
            setAvailableTimes(times);
        } catch (error) {
            console.error('Failed to fetch available times:', error);
        }
        setLoadingTimes(false);
    };

    const updateDaysAndFetch = (dir: 'next' | 'prev' | 'none') => {
        const currentStartDate = new Date(days[0]);
        const newStartDate = new Date(currentStartDate);

        if (dir === 'none') {
            fetchAvailableTimes(days);
            return;
        }

        setSelectedDay(null);
        setSelectedTime(null);

        if (dir === 'next') {
            newStartDate.setDate(currentStartDate.getDate() + 5);
            setDirection('right');
        } else {
            newStartDate.setDate(currentStartDate.getDate() - 5);
            setDirection('left');
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newStartDate < today) {
            newStartDate.setDate(today.getDate());
        }

        const newDays = getNextDays(5, newStartDate);
        setDays(newDays);
        fetchAvailableTimes(newDays);
    };


    const handleTimeSlotClick = (day: string, time: string) => {
        setSelectedDay(day);
        setSelectedTime(time);
    };

    return (
        <div className="" >
            <div className="flex items-center justify-center">

                {!(days[0] <= new Date().toISOString().split('T')[0]) &&
                    <Button
                        variant="ghost"
                        className="p-1"
                        onClick={() => updateDaysAndFetch('prev')}
                    >
                        <ChevronLeftIcon />
                    </Button>}

                <TimePickerGrid
                    direction={direction}
                    expanded={expanded}
                    days={days}
                    availableTimes={availableTimes}
                    loadingTimes={loadingTimes}
                    selectedDay={selectedDay}
                    selectedTime={selectedTime}
                    handleTimeSlotClick={handleTimeSlotClick}
                />
                <Button variant="ghost" className="p-1" onClick={() => updateDaysAndFetch('next')}>
                    <ChevronRightIcon />
                </Button>
            </div>
            {!initiallyExpanded && <div className="flex items-center justify-center">
                <Button
                    variant="ghost"
                    className="mt-2 px-4 py-2"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? 'Show Less' : 'Show More'}
                </Button>
            </div>}


        </div>

    );
};

export default TimePickerController;