
import PatientDashboard  from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import AdminDoctorManagement from './AdminDoctorManagement'


const Dashboard = ({ profile , user}) => {
  // Loading state
  if (!profile) {
    return <p>Loading...</p>;
  }

  // Role-based rendering
  switch (profile.role) {
    case "patient":
      return <PatientDashboard user={user}/>;
    case "doctor":
      return <DoctorDashboard user={user}/>;
    case "admin":
      return <AdminDoctorManagement />;
    default:
      return <p>Unauthorized role</p>;
  }
};

export default Dashboard;