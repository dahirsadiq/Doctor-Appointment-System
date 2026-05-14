import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= GET USER =================
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user;
  };

  // ================= FETCH APPROVED DOCTORS =================
 const fetchDoctors = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, email, role, status")
    .eq("role", "doctor");

  if (error) {
    console.error(error.message);
    return;
  }

  const approved = (data || []).filter(
    (d) => d.status === "approved"
  );

  setDoctors(approved);
  setFilteredDoctors(approved);
};
  // ================= SEARCH =================
  const handleSearch = (value) => {
    setSearch(value);

    const filtered = doctors.filter(
      (doc) =>
        (doc.username || "").toLowerCase().includes(value.toLowerCase()) ||
        (doc.email || "").toLowerCase().includes(value.toLowerCase())
    );

    setFilteredDoctors(filtered);
  };

  // ================= GET APPOINTMENTS =================
  const getMyAppointments = async () => {
    const user = await getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("appointments")
      .select(`
        id,
        appointment_date,
        status,
        doctor:doctor_id (username, email)
      `)
      .eq("patient_id", user.id)
      .order("appointment_date", { ascending: false });

    if (error) {
      console.error("Appointments error:", error.message);
      return;
    }

    setAppointments(data || []);
  };

  // ================= BOOK APPOINTMENT =================
  const bookAppointment = async () => {
    const user = await getUser();

    if (!user) return alert("Not logged in");
    if (!selectedDoctorId) return alert("Select doctor");
    if (!date) return alert("Select date");

    // confirm doctor exists & is approved
    const { data: doctor, error } = await supabase
      .from("profiles")
      .select("id, role, status")
      .eq("id", selectedDoctorId)
      .eq("role", "doctor")
      .eq("status", "approved")
      .single();

    if (error || !doctor) {
      return alert("Doctor not available");
    }

    const { error: insertError } = await supabase
      .from("appointments")
      .insert({
        patient_id: user.id,
        doctor_id: doctor.id,
        appointment_date: date,
        status: "pending",
      });

    if (insertError) {
      alert(insertError.message);
      return;
    }

    alert("Appointment booked!");

    setDate("");
    setSelectedDoctorId("");

    getMyAppointments();
  };

  // ================= CANCEL =================
  const cancelAppointment = async (id) => {
    await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", id);

    getMyAppointments();
  };

  // ================= RESCHEDULE =================
  const rescheduleAppointment = async (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD HH:mm)");
    if (!newDate) return;

    await supabase
      .from("appointments")
      .update({
        appointment_date: newDate,
        status: "rescheduled",
      })
      .eq("id", id);

    getMyAppointments();
  };

  // ================= INIT =================
  useEffect(() => {
    fetchDoctors();
    getMyAppointments();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">
        Patient Dashboard
      </h2>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search doctors..."
          className="border p-2 w-full rounded"
        />
      </div>

      {/* DOCTORS */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded shadow">

            <h3 className="font-bold">{doc.username}</h3>
            <p className="text-sm text-gray-600">{doc.email}</p>

            <button
              onClick={() => setSelectedDoctorId(doc.id)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Select Doctor
            </button>

          </div>
        ))}
      </div>

      {/* BOOK */}
      <div className="bg-white p-4 rounded shadow mb-8">

        <h3 className="font-semibold mb-2">
          Book Appointment
        </h3>

        <p className="mb-2">
          Selected Doctor:{" "}
          <b>
            {doctors.find((d) => d.id === selectedDoctorId)?.username || "None"}
          </b>
        </p>

        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <button
          onClick={bookAppointment}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>

      </div>

      {/* APPOINTMENTS */}
      <div className="bg-white p-4 rounded shadow">

        <h3 className="font-semibold mb-4">
          My Appointments
        </h3>

        <table className="w-full text-sm">

          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Doctor</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id} className="border-b">

                <td className="p-2">
                  {appt.doctor?.username}
                </td>

                <td className="p-2">
                  {appt.appointment_date
                    ? new Date(appt.appointment_date).toLocaleString()
                    : "-"}
                </td>

                <td className="p-2">{appt.status}</td>

                <td className="p-2 space-x-2">

                  <button
                    onClick={() => cancelAppointment(appt.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => rescheduleAppointment(appt.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
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

export default PatientDashboard;