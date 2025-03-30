import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; 

export default function WelcomeBack() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 150);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div
        className={`w-full max-w-md p-6 rounded-xl shadow-2xl border border-gray-800 transition-all duration-500 ease-in-out 
        ${show ? "opacity-100 scale-100 translate-y-0 blur-0" : "opacity-0 scale-95 translate-y-2 blur-sm"} bg-gray-900 text-white`}
      >
        <h1 className="text-2xl font-semibold text-center text-gray-100 tracking-wide">
          Welcome Back
        </h1>
        <p className="mt-3 text-sm text-gray-400 text-center leading-relaxed">
          Some people shape our lives without knowing it.  
          Take a moment to let them know.
        </p>
        <div className="flex flex-col gap-3 mt-6">
          <Button 
            onClick={() => navigate("/")} 
            bgColor="bg-gray-800" 
            className="hover:bg-gray-700 text-sm shadow-md hover:shadow-lg transition"
          >
            Go Home
          </Button>
          <Button 
            onClick={() => navigate("/add-post")} 
            bgColor="bg-blue-600" 
            className="hover:bg-blue-500 text-sm shadow-md hover:shadow-lg transition"
          >
            Write Your Thanks
          </Button>
        </div>
      </div>
    </div>
  );
}
