import ProtectedRoute from "@/components/ProtextedRoutes";


const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>Protected Content</div>
    </ProtectedRoute>
  );
};

export default Dashboard;
