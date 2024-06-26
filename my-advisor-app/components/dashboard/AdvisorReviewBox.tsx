import { AppointmentDto, ReviewDto } from "@/types/types";
import { formatDateToUTCString } from "@/utils/dateUtils";
import { Card } from "../ui/card";
import RatingStars from "../misc/RatingStars";


interface AdvisorReviewBox {
    review: ReviewDto;
}

const AdvisorReviewBox: React.FC<AdvisorReviewBox> = ({ review }) => {

    return (<Card className="items-center">

        <div className=" items-center p-4 space-y-2">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <RatingStars initialRating={review.rating} />
                    <h1 className="text-sm text-gray-500">{formatDateToUTCString(review.created_at, "MMM d, yyyy")}</h1>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 italic">{review.user_config.profile.first_name}</p>
                    <div className="text-sm flex items-center ">{review.review}</div>
                </div>

            </div>
        </div>


    </Card>);
}



export default AdvisorReviewBox;