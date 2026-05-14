import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  // 🔐 Get logged-in doctor
  useEffect(() => {
    const getDoctor = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) return;

      const { data: doctor, error } = await supabase
        .from("doctors")
        .select("id")
        .eq("email", userData.user.email)
        .single();

      if (!error && doctor) {
        setDoctorId(doctor.id);
        fetchAppointments(doctor.id);
      }
    };

    getDoctor();
  }, []);

  // 📅 Fetch appointments
  const fetchAppointments = async (id) => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("doctor_id", id)
      .order("date", { ascending: true });

    if (!error) setAppointments(data || []);
  };

  // ✅ Accept / Reject booking
  const updateStatus = async (appointmentId, status) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", appointmentId);

    if (!error) {
      fetchAppointments(doctorId); // refresh list
    } else {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">
        👨‍⚕️ Doctor Dashboard
      </h2>

      <h3 className="text-xl font-semibold mb-4">
        📅 My Appointments
      </h3>

      {appointments.length === 0 ? (
        <p>No appointments found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {appointments.map((appt) => (
            <div key={appt.id} className="bg-white p-4 rounded shadow">

              <h3 className="font-bold text-lg">
                {appt.patient_name}
              </h3>

              <p className="text-gray-600">
                {appt.patient_email}
              </p>

              <p className="mt-2">
                📅 {appt.date} | ⏰ {appt.time}
              </p>

              <p className="mt-2">
                Status:{" "}
                <span
                  className={
                    appt.status === "accepted"
                      ? "text-green-600"
                      : appt.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {appt.status}
                </span>
              </p>

              {/* ✅ ACTION BUTTONS */}
              {appt.status === "pending" && (
                <div className="mt-3 space-x-2">

                  <button
                    onClick={() => updateStatus(appt.id, "accepted")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(appt.id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default DoctorDashboard;