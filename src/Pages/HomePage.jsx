import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Doctor Appointment System
        </h1>
        <p className="text-lg mb-6">
          Book appointments بسهولة • Manage patients • Save time
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-2 rounded font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/doctors"
            className="border border-white px-6 py-2 rounded font-semibold"
          >
            Find Doctors
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">
          What You Can Do
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {/* PATIENT */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">
              👤 Patients
            </h3>
            <p className="text-gray-600">
              Book appointments with doctors بسهولة and track your visits.
            </p>
          </div>

          {/* DOCTOR */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">
              🧑‍⚕️ Doctors
            </h3>
            <p className="text-gray-600">
              Manage appointments, accept/reject bookings, and reschedule.
            </p>
          </div>

          {/* ADMIN */}
          <div className="bg-white p-6 rounded shadow text-center">
            <h3 className="text-xl font-semibold mb-2">
              🛠 Admin
            </h3>
            <p className="text-gray-600">
              Approve doctors and control the whole system بسهولة.
            </p>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-blue-100 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to get started?
        </h2>

        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded font-semibold"
        >
          Create Account
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p>© 2026 Doctor Appointment System • Mogadishu</p>
      </footer>

    </div>
  );
};

export default HomePage;