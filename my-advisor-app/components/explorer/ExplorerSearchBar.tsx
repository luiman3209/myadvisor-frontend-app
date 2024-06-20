import { ServiceType } from "@/types/entity/service_type_entity";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CountryPicker } from "../input/CountryPicker";




interface ExplorerSearchBarsProps {
    availableServices: ServiceType[];
    serviceId: number | undefined;
    setServiceId: (id: number | undefined) => void;
    countryCode: string | undefined;
    setCountryCode: (code: string | undefined) => void;
}




const ExplorerSearchBar: React.FC<ExplorerSearchBarsProps> = ({ availableServices, serviceId,

    setServiceId, countryCode, setCountryCode
}) => {


    return (
        <div className="py-4 bg-gray-100 border-b justify-center ">
            <div className="px-4 flex space-x-4 lg:w-1/2 2xl:ml-64">
                <div className="lg:w-1/2">
                    <Select value={availableServices.find(s => s.service_id === serviceId)?.service_type_name || ''} onValueChange={(e) => setServiceId(availableServices.find(s => s.service_type_name === e)?.service_id || undefined)}>
                        <SelectTrigger className=" text-slate-600 text-base">
                            <SelectValue placeholder="Service Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {availableServices.map((type) => (
                                    <SelectItem className="text-base text-black" key={type.service_id} value={type.service_type_name}>
                                        {type.service_type_name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <CountryPicker countryCode={countryCode} setCountryCode={setCountryCode} />
            </div>
        </div>
    );
};

export default ExplorerSearchBar;