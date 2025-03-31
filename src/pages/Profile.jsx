import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/profileService";
import { updateProfile } from "../features/profileSlice.js";
import Button from "../components/Button.jsx";
import { FaUser, FaVenusMars, FaBriefcase, FaHeart, FaInfoCircle, FaLinkedin, FaInstagram, FaSnapchat, FaGithub } from "react-icons/fa";

export default function ProfilePage() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData); // 🔹 Get logged-in user data
    const { userId, userName } = useParams();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const { register, handleSubmit, setValue } = useForm();
    
    // 🔹 Check if the logged-in user is viewing their own profile
    const isOwner = userData?.userData?.$id === userId;

    useEffect(() => {
        let isMounted = true;
    
        const fetchProfile = async () => {
            try {
                let profileData = await appwriteService.getProfile(userId);
    
                if (!profileData && isMounted) {
                    await appwriteService.createProfile({
                        userId: userId,
                        fullName: userName || "",
                        gender: "",
                        bio: "Do what you love or love what you do.",
                        dream: "A happy life with happy family.",
                        status: "Living in reality.",
                        linkedin: "",
                        github: "",
                        instagram: "",
                        snapchat: "",
                    });
    
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    profileData = await appwriteService.getProfile(userId);
                }
    
                if (isMounted) {
                    setProfile(profileData);
                    Object.keys(profileData).forEach((key) => setValue(key, profileData[key]));
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
            setLoading(false);
        };
    
        fetchProfile();
    
        return () => {
            isMounted = false;
        };
    }, [dispatch, userId, userName, setValue]);

    const onSubmit = async (data) => {
        if (!data || Object.keys(data).length === 0) return;
        try {
            const updatedProfile = await appwriteService.updateProfile(userId, data);
            setProfile(updatedProfile);
            dispatch(updateProfile(updatedProfile));
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <p className="text-center text-white">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

            {isOwner ? ( // 🔹 Allow editing if the user is the owner
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {[
                        { name: "fullName", placeholder: "Full Name", icon: <FaUser /> },
                        { name: "gender", placeholder: "Gender", icon: <FaVenusMars /> },
                        { name: "dream", placeholder: "Aspiration", icon: <FaHeart /> },
                        { name: "bio", placeholder: "Bio", icon: <FaInfoCircle /> },
                        { name: "status", placeholder: "Current Status", icon: <FaBriefcase />, isTextArea: true },
                        { name: "linkedin", placeholder: "LinkedIn", icon: <FaLinkedin /> },
                        { name: "github", placeholder: "GitHub", icon: <FaGithub /> },
                        { name: "instagram", placeholder: "Instagram", icon: <FaInstagram /> },
                        { name: "snapchat", placeholder: "Snapchat", icon: <FaSnapchat /> },
                    ].map(({ name, placeholder, icon, isTextArea }) => (
                        <div key={name} className="flex items-center bg-gray-800 rounded-lg p-3">
                            <span className="text-gray-400 text-lg mr-3">{icon}</span>
                            {isTextArea ? (
                                <textarea
                                    {...register(name)}
                                    placeholder={placeholder}
                                    className="bg-transparent flex-1 text-white placeholder-gray-500 outline-none"
                                />
                            ) : (
                                <input
                                    {...register(name)}
                                    placeholder={placeholder}
                                    className="bg-transparent flex-1 text-white placeholder-gray-500 outline-none"
                                />
                            )}
                        </div>
                    ))}

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-bold">
                        Save Profile
                    </Button>
                </form>
            ) : ( // 🔹 Read-only profile view for other users
                <div className="space-y-4">
                    {[
                        { name: "fullName", label: "Full Name", icon: <FaUser /> },
                        { name: "gender", label: "Gender", icon: <FaVenusMars /> },
                        { name: "dream", label: "Aspiration", icon: <FaHeart /> },
                        { name: "bio", label: "Bio", icon: <FaInfoCircle /> },
                        { name: "status", label: "Current Status", icon: <FaBriefcase /> },
                        { name: "linkedin", label: "LinkedIn", icon: <FaLinkedin /> },
                        { name: "github", label: "GitHub", icon: <FaGithub /> },
                        { name: "instagram", label: "Instagram", icon: <FaInstagram /> },
                        { name: "snapchat", label: "Snapchat", icon: <FaSnapchat /> },
                    ].map(({ name, label, icon }) => (
                        <div key={name} className="flex items-center bg-gray-800 rounded-lg p-3">
                            <span className="text-gray-400 text-lg mr-3">{icon}</span>
                            <p className="text-white">{profile?.[name] || `...`}</p>
                        </div>
                    ))}
                </div>
            )}

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center text-gray-400 mt-4"
            >
                Last updated: {profile?.$updatedAt ? new Date(profile.$updatedAt).toLocaleString() : "Never"}
            </motion.p>
        </div>
    );
}
