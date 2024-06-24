
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
interface AlertNotificationProps {
    isError: boolean;
    title: string;
    message: string;
}

const AlertNotification = ({ isError,
    title,
    message
}: AlertNotificationProps) => {


    return (
        <div className="fixed bottom-12 right-12 mb-4 mr-4">
            <Alert className={isError ? "bg-red-500 text-white" : ""}>
                <Info className="h-4 w-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        </div>
    );
};

export default AlertNotification;
