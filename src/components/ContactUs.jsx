import React from "react";

function ContactUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="max-w-2xl w-full bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-gray-500 bg-gray-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-gray-500 bg-gray-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              className="w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-gray-500 bg-gray-200"
              rows="4"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
