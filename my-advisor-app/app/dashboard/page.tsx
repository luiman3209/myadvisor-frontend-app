"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getInvestorDashboard, getAdvisorDashboard } from '@/services/dashboardService';
import ProtectedRoute from '@/components/auth/ProtectedRoutes';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (user?.role === 'investor') {
          const data = await getInvestorDashboard();
          
          setDashboardData(data);
        } else if (user?.role === 'advisor') {
          
          const data = await getAdvisorDashboard();
          console.log(data);
          setDashboardData(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProtectedRoute>
      <div>
        <h1>Dashboard</h1>
        {user?.role === 'investor' && dashboardData && (
          <div>
            <h2>Upcoming Appointments</h2>
            <ul>
              {dashboardData.upcomingAppointments.map((appointment: any) => (
                <li key={appointment.appointment_id}>
                  {appointment.start_time} with {appointment.advisor.user_config.email}
                </li>
              ))}
            </ul>
            <h2>Recent Activity</h2>
            <ul>
              {dashboardData.recentActivity.map((activity: any) => (
                <li key={activity.id}>
                  {activity.text} - {activity.Advisor.User.email}
                </li>
              ))}
            </ul>
          </div>
        )}
        {user?.role === 'advisor' && dashboardData && (
          <div>
            <h2>Upcoming Appointments</h2>
            <ul>
              {dashboardData.upcomingAppointments.map((appointment: any) => (
                <li key={appointment.appointment_id}>
                  {appointment.start_time} with {appointment.user_config.email}
                </li>
              ))}
            </ul>
            <h2>Client Interactions</h2>
            <ul>
              {dashboardData.clientInteractions.map((interaction: any) => (
                <li key={interaction.appointment_id}>
                  {interaction.start_time} with {interaction.user_config.email}
                </li>
              ))}
            </ul>
            <h2>Profile Views</h2>
            <p>{dashboardData.profileViews[0]?.profile_views || 0} views</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
