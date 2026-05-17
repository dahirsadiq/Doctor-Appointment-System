import { Link } from "react-router";

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* NAVBAR (NO LOGO) */}
      <nav className="flex justify-end items-center px-6 py-4 bg-white shadow">
        {/* <div className="flex gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
        </div> */}
      </nav>

      {/* HEADER (kept because it's page title, not logo) */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Contact Us
        </h1>
        <p className="text-lg">
          We are here to help you anytime
        </p>
      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-6">
            If you have any questions, need support, or want to learn more about our services,
            feel free to contact us.
          </p>

          <div className="space-y-4 text-gray-700">
            <p>📍 Mogadishu, Somalia</p>
            <p>📞 +252 61 0000000</p>
            <p>📧 support@medcare.com</p>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">
            Send Message
          </h3>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© 2026 MedCare • Mogadishu</p>
      </footer>

    </div>
  );
};

export default ContactPage;