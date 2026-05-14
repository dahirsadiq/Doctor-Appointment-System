import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

const AdminDashboard = () => {
  const [tab, setTab] = useState("doctors");

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // ================= FETCH DOCTORS =================
  const fetchDoctors = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "doctor")
    .eq("status", "pending"); // 👈 only pending doctors

  if (error) {
    console.error(error.message);
  } else {
    setDoctors(data || []);
  }
};

  // ================= FETCH PATIENTS =================
  const fetchPatients = async () => {
    const { data, error } = await supabase.from("patients").select("*");
    if (error) console.error(error);
    else setPatients(data || []);
  };

 const getAllAppointments = async () => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  console.log(user);

  if (!user) return;

  // optional: check role (recommended)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    console.error("Not admin");
    return;
  }

  const { data, error } = await supabase
    .from("appointments")
    .select(`
      id,
      appointment_date,
      status,
      patient:patient_id (username, email),
      doctor:doctor_id (username, email)
    `)
    .order("appointment_date", { ascending: false });

  if (error) {
    console.error("Appointments error:", error.message);
    return;
  }

  setAppointments(data || []);
};
  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    getAllAppointments();
  }, []);

  // ================= DOCTOR APPROVAL =================
 const updateDoctorStatus = async (id, status) => {
  const { error } = await supabase
    .from("profiles")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error(error.message);
  } else {
    fetchDoctors(); // refresh list
  }
};


 
  // ================= APPOINTMENT ACTIONS =================
  const updateAppointmentStatus = async (id, status) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (!error) fetchAppointments();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">
        🏥 Admin Dashboard
      </h2>

      {/* ================= TABS ================= */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() => setTab("doctors")}
          className={`px-4 py-2 rounded ${
            tab === "doctors" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Doctors
        </button>

        <button
          onClick={() => setTab("patients")}
          className={`px-4 py-2 rounded ${
            tab === "patients" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Patients
        </button>

        <button
          onClick={() => setTab("appointments")}
          className={`px-4 py-2 rounded ${
            tab === "appointments" ? "bg-blue-600 text-white" : "bg-white"
          }`}
        >
          Appointments
        </button>

      </div>

      {/* ================= DOCTORS ================= */}
     {tab === "doctors" && (
  <div className="bg-white p-4 rounded shadow">

    <table className="w-full text-sm">

      {/* HEADER */}
      <thead>
        <tr className="border-b bg-gray-100 text-left">
          <th className="p-2">UserName</th>
          <th className="p-2">Email </th>
          <th className="p-2">Status</th>
          {/* <th className="p-2">Actions</th> */}
        </tr>
      </thead>

      {/* BODY */}
      <tbody>
        {doctors.map((doc) => (
          <tr key={doc.id} className="border-b">

            {/* NAME */}
            <td className="p-2 font-medium">
              {doc.username}
            </td>
               <td className="p-2 font-medium">
              {doc.email}
            </td>
               <td className="p-2 font-medium">
              {doc.email}
            </td>
            <td className="p-2 font-medium">
              {doc.status}
            </td>
               <td className="p-2 font-medium">
              {doc.status}
            </td>
            
          

            {/* SIGNUP DATE */}
            {/* <td className="p-2">
              {doc.created_at
                ? new Date(doc.created_at).toLocaleDateString()
                : "-"}
            </td> */}

            {/* STATUS */}
            <td className="p-2">
              <span
                className={
                  doc.status === "approved"
                    ? "text-green-600 font-semibold"
                    : doc.status === "rejected"
                    ? "text-red-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }
              >
                {doc.status || "pending"}
              </span>
            </td>

            {/* ACTIONS */}
                   <div className="flex gap-3 mt-2">
  <button
    onClick={() => updateDoctorStatus(doc.id, "approved")}
    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition duration-200"
  >
    Approve
  </button>

  <button
    onClick={() => updateDoctorStatus(doc.id, "rejected")}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition duration-200"
  >
    Reject
  </button>
</div>

          </tr>
        ))}
      </tbody>

    </table>

  </div>
)}

      {/* ================= PATIENTS ================= */}
      {tab === "patients" && (
        <div className="grid md:grid-cols-3 gap-4">

          {patients.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded shadow">
              <h4 className="font-bold">{p.name}</h4>
              <p>{p.email}</p>
            </div>
          ))}

        </div>
      )}

      {/* ================= APPOINTMENTS ================= */}
    {tab === "appointments" && (
<div className="bg-white p-4 rounded shadow overflow-x-auto">

  <h3 className="text-lg font-bold mb-4">
    All Appointments
  </h3>

  <table className="w-full text-sm border-collapse">

    {/* HEADER */}
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="p-3 border">Patient</th>
        <th className="p-3 border">Doctor</th>
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
)}

    </div>
  );
};

export default AdminDashboard;