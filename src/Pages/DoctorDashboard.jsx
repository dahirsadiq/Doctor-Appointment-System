import { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const {user}=useAuth();

  // ================= GET USER =================
  // const getUser = async () => {
  //   const { data } = await supabase.auth.getUser();
  //   return data?.user;
  // };

  // ================= FETCH APPOINTMENTS =================
  const getAllAppointments = async () => {
    // const user = await getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("appointments")
      .select(`
        id,
        appointment_date,
        status,
        patient:patient_id (username, email)
      `)
      .eq("doctor_id", user.id)
      .order("appointment_date", { ascending: false });

    if (error) {
      console.error("Appointments error:", error.message);
      return;
    }

    setAppointments(data || []);
  };

  // ================= UPDATE STATUS =================
  const updateAppointmentStatus = async (id, status) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error(error.message);
    } else {
      getAllAppointments();
    }
  };

  // ================= RESCHEDULE =================
  const rescheduleAppointment = async (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD HH:mm)");
    if (!newDate) return;

    const { error } = await supabase
      .from("appointments")
      .update({
        appointment_date: newDate,
        status: "rescheduled",
      })
      .eq("id", id);

    if (!error) getAllAppointments();
  };

  // ================= INIT =================
  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">
        🧑‍⚕️ Doctor Dashboard
      </h2>

      <div className="bg-white p-4 rounded shadow overflow-x-auto">

        <h3 className="text-lg font-bold mb-4">
          My Appointments
        </h3>

        <table className="w-full text-sm border-collapse">

          {/* HEADER */}
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Patient</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
   {appointments.map((appt) => (
        <tr key={appt.id} className="hover:bg-gray-50">

          {/* Patient */}
          <td className="p-3 border font-medium">
            👤 {appt.patient?.username || "Unknown"}
          </td>

          {/* Doctor */}
          <td className="p-3 border">
            🩺 {appt.doctor?.username || "Unknown"}
          </td>

          {/* Date */}
          <td className="p-3 border">
            {appt.appointment_date
              ? new Date(appt.appointment_date).toLocaleString()
              : "-"}
          </td>

          {/* Status */}
          <td className="p-3 border">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold
                ${
                  appt.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : appt.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {appt.status}
            </span>
          </td>

          {/* Actions */}
          <td className="p-3 border space-x-2">

            <button
              onClick={() => cancelAppointment(appt.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
            >
              Cancel
            </button>

            <button
              onClick={() => rescheduleAppointment(appt.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
            >
              Reschedule
            </button>

          </td>

        </tr>
      ))}


          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DoctorDashboard;