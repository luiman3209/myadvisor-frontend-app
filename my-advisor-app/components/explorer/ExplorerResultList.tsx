
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

import { Video, MapPin } from "lucide-react";
import RatingStars from "../misc/RatingStars";
import BookAppointmentV2 from "../book_appointment/BookAppointmentV2";
import BoxCollection from "../misc/BoxCollection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AdvisorSearchResultResp } from "@/types/types";
import { ServiceType } from "@/types/entity/service_type_entity";
import Link from "next/link";



interface ExplorerResultListProps {
  advisors: AdvisorSearchResultResp[];
  availableServices: ServiceType[];
}




const ExplorerResultList: React.FC<ExplorerResultListProps> = ({

  advisors, availableServices,
}) => {


  return (
    <ul className="space-y-6 ">
      {advisors.length === 0 && <div className="text-center text-lg items-center justify-center">
        <span>

          No advisors found, try changing filters
        </span>
      </div>}
      {advisors.length > 0 && advisors.map((advisor) => (
        <li key={advisor.advisor_id} className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col space-y-4 md:w-1/3">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={advisor.img_url} alt="profile" />
                  <AvatarFallback>{advisor.display_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                  <Link href={`/advisor/profile?advisor=${advisor.advisor_id}`} className="text-xl font-semibold hover:underline">
                    {advisor.display_name}
                  </Link>
                  <div className='flex flex-row items-center space-x-2'>
                    {advisor.average_rating > 0 &&
                      <RatingStars initialRating={advisor.average_rating} />}<span className='text-gray-500 text-xs'>{advisor.review_count} Reviews</span>
                  </div>
                  <BoxCollection
                    items={availableServices.filter(s => advisor.advisor_services.includes(s.service_id)).map(s => s.service_type_name)}
                  />
                </div>
              </div>
              <Tabs defaultValue="address" className="w-full text-sm flex flex-col h-full">
                <TabsList className="flex space-x-2">
                  <TabsTrigger value="address" className="flex-1">Address</TabsTrigger>
                  <TabsTrigger value="online" className="flex-1"><Video className="w-4 h-4 pr-1" />Online</TabsTrigger>
                </TabsList>
                <TabsContent value="address" className="flex p-4 justify-start items-center space-x-2 mt-2 h-full">
                  <MapPin className="w-6 h-6" />
                  <Link target="_blank" href={`https://www.google.com/maps/search/${advisor.office_address}`} className=" hover:underline">
                    {advisor.office_address}
                  </Link>
                </TabsContent>
                <TabsContent value="online" className=" h-full">
                  Online consultation not available
                </TabsContent>
              </Tabs>
            </div>
            <div className="md:w-2/3 mt-4 md:mt-0 md:border-l-2 md:ml-2">
              <BookAppointmentV2
                advisorId={advisor.advisor_id}
                officeAddress={advisor.office_address}
                services={availableServices.filter(s => advisor.advisor_services.includes(s.service_id))}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>

  );
};

export default ExplorerResultList;