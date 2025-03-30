import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupWelcome() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden px-6">
      {/* Soft glow background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black opacity-40"></div>

      <div
        className={`max-w-xl w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-10 shadow-2xl text-white transition-all duration-700 ease-in-out 
        ${show ? "opacity-100 scale-100 translate-y-0 blur-0" : "opacity-0 scale-95 translate-y-4 blur-sm"}`}
      >
        <h1 className="text-3xl font-bold text-center tracking-wide mb-5 drop-shadow-md">
          Welcome to Something More Than a Platform
        </h1>

        <p className="text-sm text-center leading-relaxed opacity-90 drop-shadow-sm">
          "Every great story has unseen characters—the ones who shaped us,  
          challenged us, and made us who we are today.  
          <br /><br />
          <strong>This is not just a platform.</strong>  
          It's a space where gratitude finds its voice.  
          A place to give back to those who shaped your journey.  
          <br /><br />
          You are now part of something rare—  
          a movement to acknowledge those who deserve to be remembered.  
          Some words should never be left unsaid."
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer w-full px-6 py-3 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Start Exploring
          </button>

          <button
            onClick={() => navigate("/add-post")}
            className="cursor-pointer w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Write Your Thanks Now
          </button>
        </div>
      </div>
    </div>
  );
}
