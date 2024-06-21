// create react component

import { Button } from "../ui/button";


interface RegisterFormNavigatorProps {
    formStep: number;
    nextStep: () => void;
    previousStep: () => void;
    handleSubmit: () => Promise<void>;
}


const RegisterFormNavigator = ({
    formStep,
    nextStep,
    previousStep,
    handleSubmit

}: RegisterFormNavigatorProps) => {
    return (
        <div className="flex justify-between mt-6">
            {formStep > 0 && <Button onClick={previousStep}>Back</Button>}
            {formStep < 3 && <Button onClick={nextStep} className="ml-auto bg-cyan-500">Next</Button>}
            {formStep === 3 && <Button onClick={handleSubmit} className="ml-auto bg-cyan-500">Submit</Button>}
        </div>);
}

export default RegisterFormNavigator;