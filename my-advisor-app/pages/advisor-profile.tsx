import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPublicAdvisorProfile } from '@/services/advisorService';


const AdvisorPublicProfile = () => {
    const router = useRouter();
    const { advisorId } = router.query;
    const [advisor, setAdvisor] = useState<any>(null);
    const [profileReviews, setProfileReviews] = useState<any[]>([]);
    const [serviceTypes, setServiceTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (advisorId) {
            const fetchAdvisor = async () => {
                setLoading(true);
                setError(null);

                try {
                    const data = await getPublicAdvisorProfile(Number(advisorId));
                    setAdvisor(data.advisor);
                    setProfileReviews(data.profileReviews);
                    setServiceTypes(data.serviceTypes);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchAdvisor();
        }
    }, [advisorId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Advisor Profile</h1>
            {advisor && (
                <div>
                    <p><strong>Contact info:</strong> {advisor.contact_information}</p>
                    <p><strong>Office Address:</strong> {advisor.office_address}</p>
                    <p><strong>Operating City Code:</strong> {advisor.operating_city_code}</p>
                    <p><strong>Operating Country Code:</strong> {advisor.operating_country_code}</p>
                    <p><strong>Qualifications:</strong> {advisor.qualifications}</p>
                    <p><strong>Expertise:</strong> {advisor.expertise}</p>
                    <p><strong>Start Shift 1:</strong> {new Date(advisor.start_shift_1).toLocaleString()}</p>
                    <p><strong>End Shift 1:</strong> {new Date(advisor.end_shift_1).toLocaleString()}</p>
                    {advisor.start_shift_2 && <p><strong>Start Shift 2:</strong> {new Date(advisor.start_shift_2).toLocaleString()}</p>}
                    {advisor.end_shift_2 && <p><strong>End Shift 2:</strong> {new Date(advisor.end_shift_2).toLocaleString()}</p>}
                    <p><strong>Profile Views:</strong> {advisor.profile_views}</p>
                    <p><strong>Verified:</strong> {advisor.is_verified === 'Y' ? 'Yes' : 'No'}</p>

                    <h2>Service Types</h2>
                    <ul>
                        {serviceTypes.map((service: any) => (
                            <li key={service.service_id}>{service.service_type_name}</li>
                        ))}
                    </ul>

                    <h2>Reviews</h2>
                    {profileReviews.map((review: any) => (
                        <div key={review.id}>
                            <p><strong>Rating:</strong> {review.rating}</p>
                            <p>{review.review}</p>
                            <p><strong>By:</strong> {review.User.email}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdvisorPublicProfile;
