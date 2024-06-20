import { getNextDays } from "@/utils/commonUtils";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { formatDateToUTCString } from "@/utils/dateUtils";

interface TimePickerGridProps {
    handleTimeSlotClick: (day: string, time: string) => void;
    availableTimes: { [key: string]: string[] };
    loadingTimes: boolean;
    selectedDay: string | null;
    selectedTime: string | null;
    direction?: 'left' | 'right';
    expanded: boolean;
    days: string[];


}




const TimePickerGrid: React.FC<TimePickerGridProps> = ({
    handleTimeSlotClick,
    availableTimes,
    loadingTimes,
    selectedDay,
    selectedTime,
    direction,
    expanded,
    days

}) => {




    return (
        <motion.div className="relative w-[530px]"
            initial={{ height: 250 }}
            animate={{ height: expanded ? 420 : 250 }}
            transition={{ duration: 0.4 }}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={days[0]}
                    initial={{ x: direction === 'right' ? 100 : -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction === 'right' ? -100 : 100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 right-0 flex md:gap-2 lg:gap-4 xl:gap-8  justify-center items-start overflow-x-auto"
                >
                    {days.map((day) => (
                        <div key={day} className="flex flex-col items-center justify-center">
                            <span className="font-bold mb-2"> {formatDateToUTCString(new Date(day), "MMM d")}</span>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: expanded ? 'auto' : 180 }}
                                transition={{ duration: 0.4 }}
                                className="overflow-hidden"
                            >
                                <div className="flex flex-col gap-2">
                                    {loadingTimes ? (
                                        <div className="flex justify-center items-center h-full">
                                            <Loader className="animate-spin" />
                                        </div>
                                    ) : availableTimes[day] ? availableTimes[day].slice(0, expanded ? undefined : 5).map((time) => (
                                        <Button
                                            key={day + time}
                                            className={`px-3 py-2 border border-gray-300 text-black rounded 
                                                ${selectedDay === day && selectedTime === time ? 'bg-cyan-500 text-white' : 'bg-white hover:bg-cyan-500 hover:text-white'}`}
                                            onClick={() => handleTimeSlotClick(day, time)}
                                        >
                                            {time}
                                        </Button>
                                    )) : (
                                        <span className="text-gray-500"> - </span>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default TimePickerGrid;