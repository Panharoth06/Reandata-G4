import { useState, useEffect, useRef } from "react";
import { data, useNavigate } from "react-router-dom";
import {
  useUpdateUserMutation,
  useUpdateUserProfileImageMutation,
  isValidUuid,
} from "../redux/services/authSlice";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photoErrorMessage, setPhotoErrorMessage] = useState("");
  const [location, setLocation] = useState("");
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    profileImage: null,
    email: "",
  });
  const [originalProfileData, setOriginalProfileData] = useState(null);

  const fileInputRef = useRef(null);

  // Safely load stored user data
  const [storedUserData, setStoredUserData] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("userData") || "{}");
      return {
        user_uuid: localStorage.getItem("userUuid") || data.user_uuid || "",
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        username: data.username || "",
        profileImage: data.profileImage,
        email: data.email || "",
        loginMethod: data.loginMethod || "email",
      };
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return {
        user_uuid: "",
        firstName: "",
        lastName: "",
        username: "",
        profileImage: "",
        email: "",
        loginMethod: "email",
      };
    }
  });

  const userUuid = localStorage.getItem("userUuid") || storedUserData.user_uuid;

  const [
    updateUser,
    {
      isLoading: isUpdatingUser,
      error: updateUserError,
      isSuccess: isUserSuccess,
      data: userUpdateData,
    },
  ] = useUpdateUserMutation();

  const [
    updateUserProfileImage,
    {
      isLoading: isUpdatingImage,
      error: updateImageError,
      isSuccess: isImageSuccess,
      data: imageUpdateData,
    },
  ] = useUpdateUserProfileImageMutation();

  // Initial load and validation
  useEffect(() => {
    if (!userUuid || !isValidUuid(userUuid)) {
      console.error("Invalid or missing user UUID, redirecting to login");
      navigate("/login");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token found, redirecting to login");
      navigate("/login");
      return;
    }

    const initialData = {
      firstName: storedUserData.firstName || "",
      lastName: storedUserData.lastName || "",
      username:
        storedUserData.username ||
        (storedUserData.loginMethod === "google" && !storedUserData.username
          ? storedUserData.lastName + "168"
          : storedUserData.lastName + "168"),
      profileImage: storedUserData.profileImage || null,
      email: storedUserData.email || "",
    };
    setProfileData(initialData);
    setOriginalProfileData(initialData);
    setAnimateIn(true);
  }, [userUuid, navigate, storedUserData]);

  // Handle successful updates
  useEffect(() => {                                  
    if (
      isImageSuccess &&
      imageUpdateData?.success &&
      imageUpdateData?.imageUrl
    ) {
      try {
        const updatedUserData = {
          ...storedUserData,
          profileImage: imageUpdateData.imageUrl,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        setStoredUserData(updatedUserData);
        setProfileData((prev) => ({
          ...prev,
          profileImage: imageUpdateData.imageUrl,
        }));
        setSuccessMessage("Profile image uploaded successfully!");
        setErrorMessage("");
        setPhotoErrorMessage("");
        console.log(
          "Image update stored in API and localStorage:",
          imageUpdateData
        );
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error updating image data in localStorage:", error);
        setErrorMessage("Failed to update local storage after image upload");
      }
    } else if (isUserSuccess && userUpdateData?.success) {
      try {
        const updatedUserData = {
          ...storedUserData,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          username: profileData.username,
        };
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
        setStoredUserData(updatedUserData);
        setSuccessMessage("Profile updated successfully!");
        setErrorMessage("");
        // console.log(
        //   "Profile update stored in API and localStorage:",
        //   userUpdateData
        // );
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error updating user data in localStorage:", error);
        setErrorMessage("Failed to update local storage after profile update");
      }
    }
  }, [
    isImageSuccess,
    isUserSuccess,
    imageUpdateData,
    userUpdateData,
    profileData,
    storedUserData,
  ]);

  // Handle errors
  useEffect(() => {
    const error = updateUserError || updateImageError;
    if (error) {
      console.error("API Error:", error);
      let detailedMessage = "An unexpected error occurred. Please try again.";

      if (error?.status === 400) {
        detailedMessage = error.message || "Invalid input data.";
      } else if (error?.status === 401) {
        detailedMessage = "Unauthorized. Please log in again.";
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userUuid");
        localStorage.removeItem("userData");
        navigate("/login");
      } else if (error?.status === 409) {
        detailedMessage = "Username already taken.";
      } else if (error?.status === 431) {
        detailedMessage = "Image size too large.";
      } else if (error?.status === 500) {
        detailedMessage = "Server error. Please try again later.";
      }

      setErrorMessage(detailedMessage);
      setSuccessMessage("");
      setPhotoErrorMessage("");
      if (updateUserError) {
        setProfileData({ ...originalProfileData });
      }
    }
  }, [updateUserError, updateImageError, navigate, originalProfileData]);

  // Image upload handler
  const handleImageChange = async (e) => {
    setPhotoErrorMessage("");
    setErrorMessage("");

    if (!e.target.files || !e.target.files[0]) {
      setPhotoErrorMessage("No file selected");
      return;
    }

    const file = e.target.files[0];
    //const validTypes = ["image/jpeg", "image/png", "image/gif"];

    // if (!validTypes.includes(file.type)) {
    //   setPhotoErrorMessage("Please upload a valid image (JPEG, PNG, or GIF).");
    //   setTimeout(() => setPhotoErrorMessage(""), 3000);
    //   return;
    // }

    // if (file.size > 5 * 1024 * 1024) {
    //   setPhotoErrorMessage("Image size must be less than 5MB.");
    //   setTimeout(() => setPhotoErrorMessage(""), 3000);
    //   return;
    // }

    console.log("file", file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Replace YOUR_CLIENT_ID with your actual Imgur API client ID
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setLocation(data?.location);
      console.log("location", data?.location);

      if (!response.ok) {
        throw new Error(data.data.error || "Failed to upload image");
      }

      console.log("data", data);
    } catch (err) {
      console.log("error:", err);
    } finally {
      console.log("hello");
    }

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const imageUrl = "https://api.escuelajs.co/api/v1/files/d73a.jpg";

      const previewUrl = URL.createObjectURL(file);
      setProfileData((prev) => ({
        ...prev,
        profileImage: previewUrl,
      }));
      // Upload to API
      const imagePayload = {
        p_user_uuid: userUuid,
        image: imageUrl,
      };
      const result = await updateUserProfileImage(imagePayload).unwrap();

      // if (!result.success) {
      //   throw new Error(result.message || "Failed to upload image to API");
      // }

      console.log("Image upload successful:", result);
    } catch (error) {
      console.error("Image upload failed:", error);
      setPhotoErrorMessage(
        error.message || "Failed to process image. Please try again."
      );
      setTimeout(() => setPhotoErrorMessage(""), 3000);
      // Revert to original image
      setProfileData((prev) => ({
        ...prev,
        profileImage: originalProfileData.profileImage,
        profileImageFile: location,
      }));
    }
  };

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Profile data validation
  const validateProfileData = () => {
    if (!profileData.firstName || profileData.firstName.trim() === "")
      return "First name is required.";
    if (profileData.firstName.length > 50)
      return "First name must be less than 50 characters.";
    if (!profileData.lastName || profileData.lastName.trim() === "")
      return "Last name is required.";
    if (profileData.lastName.length > 50)
      return "Last name must be less than 50 characters.";
    if (!profileData.username || profileData.username.trim() === "")
      return "Username is required.";
    if (profileData.username.length > 30)
      return "Username must be less than 30 characters.";
    if (!/^@?[\w\d]+$/.test(profileData.username))
      return "Username must contain only letters, numbers, or underscores.";
    return null;
  };

  // Profile update handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!userUuid || !isValidUuid(userUuid)) {
      setErrorMessage("Cannot update profile: Invalid or missing user UUID.");
      navigate("/login");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setErrorMessage("No access token found. Please log in again.");
      navigate("/login");
      return;
    }

    const validationError = validateProfileData();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const hasUserDataChanges =
        profileData.firstName !== originalProfileData.firstName ||
        profileData.lastName !== originalProfileData.lastName ||
        profileData.username !== originalProfileData.username;

      if (!hasUserDataChanges) {
        setErrorMessage("No changes detected.");
        return;
      }

      const userPayload = {
        first_name_input: profileData.firstName,
        last_name_input: profileData.lastName,
        user_name_input: profileData.username,
        user_uuid_input: userUuid,
      };

      const result = await updateUser(userPayload).unwrap();
    } catch (err) {
      console.error("Profile update failed:", err);
      setErrorMessage(err.message || "Update failed. Please try again.");
    }
  };

  // Profile image click handler
  const handleProfileClick = () => {
    if (
      userUuid &&
      isValidUuid(userUuid) &&
      localStorage.getItem("accessToken") &&
      isEditing // Only allow clicking when in edit mode
    ) {
      fileInputRef.current.click();
    } else if (!userUuid || !localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-start p-4 sm:p-6 md:p-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full opacity-40 blur-xl"></div>
        <div className="absolute top-1/4 left-12 w-64 h-64 bg-primary-500/15 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-primary-500/25 rounded-full opacity-20 blur-xl"></div>
      </div>

      <div
        className={`mt-[60px] mb-[40px] w-full max-w-7xl transition-all duration-1000 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-text-100">
          <div className="relative h-56 overflow-hidden bg-primary-500">
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full opacity-20"
                  style={{
                    width: `${Math.random() * 20 + 5}px`,
                    height: `${Math.random() * 20 + 5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `float${i % 3} ${
                      Math.random() * 10 + 5
                    }s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-9 md:px-16 md:py-12 relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col items-center md:flex-row md:items-center">
                <div className="relative group">
                  <div
                    className={`h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 rounded-full border-4 border-white shadow-xl overflow-hidden text-white text-h5 font-heading -mt-24 sm:-mt-28 md:-mt-32 lg:-mt-36 relative z-10 bg-gradient-to-br from-primary-500 to-primary-400 transition-transform duration-300 ease-in-out transform ${
                      userUuid && isEditing // Only show hover effect when editing
                        ? "group-hover:scale-105 group-hover:cursor-pointer"
                        : ""
                    }`}
                    onClick={handleProfileClick}
                  >
                    {profileData?.profileImage ? (
                      <img
                        src={profileData?.profileImage[0]}
                        alt="Profile"
                        className="h-full w-full object-cover rounded-full"
                        // onError={(e) => (e.target.src = "/placeholder.svg")}
                      />
                    ) : (
                      <span className="flex items-center justify-center h-full w-full">
                        {userUuid
                          ? (profileData.firstName[0] || "") +
                            (profileData.lastName[0] || "")
                          : "?"}
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
                  <h1 className="text-h4 font-heading text-primary-500">
                    {profileData.firstName || "Guest"}{" "}
                    {profileData.lastName || "User"}
                  </h1>
                  <p className="font-description text-base text-text-700 flex items-center justify-center md:justify-start">
                    <span className="mr-1 text-primary-500">@</span>
                    <span className="truncate">
                      {profileData.username || "guest"}
                    </span>
                  </p>
                  {profileData.email ? (
                    <p className="font-description text-base text-text-700 flex items-center justify-center md:justify-start mt-2">
                      <span className="mr-1 text-primary-500">✉️</span>
                      <span className="truncate">{profileData.email}</span>
                    </p>
                  ) : (
                    <p className="font-description text-base text-text-500 flex items-center justify-center md:justify-start mt-2">
                      Email not available
                    </p>
                  )}
                  {!userUuid && (
                    <p className="font-description text-base text-text-500 flex items-center justify-center md:justify-start mt-2">
                      Please log in to edit your profile
                    </p>
                  )}
                  {photoErrorMessage && (
                    <p className="font-description text-base text-red-600 flex items-center justify-center md:justify-start mt-2">
                      {photoErrorMessage}
                    </p>
                  )}
                  {errorMessage && (
                    <p className="font-description text-base text-red-600 flex items-center justify-center md:justify-start mt-2">
                      {errorMessage}
                    </p>
                  )}
                  {successMessage && (
                    <p className="font-description text-base text-green-600 flex items-center justify-center md:justify-start mt-2">
                      {successMessage}
                    </p>
                  )}
                </div>
              </div>

              {userUuid && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-6 md:mt-0 inline-flex items-center px-6 py-2.5 border rounded-[10px] shadow-sm text-base font-heading text-white transition-all duration-300 hover:shadow-md bg-primary-500 border-primary-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>

            {userUuid && isEditing && (
              <div className="mt-8 md:mt-10">
                <div
                  className={`transition-all duration-500 ${
                    isEditing ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  <form onSubmit={handleSubmit} className="w-full mx-auto">
                    <div className="space-y-4 sm:space-y-5 md:space-y-6">
                      <div className="group">
                        <label
                          htmlFor="firstName"
                          className="block text-small font-description text-text-700 mb-1.5 group-focus-within:text-primary-500 transition-colors duration-200"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={profileData.firstName}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                          disabled={isUpdatingUser || isUpdatingImage}
                        />
                      </div>
                      <div className="group">
                        <label
                          htmlFor="lastName"
                          className="block text-small font-description text-text-700 mb-1.5 group-focus-within:text-primary-500 transition-colors duration-200"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={profileData.lastName}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                          disabled={isUpdatingUser || isUpdatingImage}
                        />
                      </div>
                      <div className="group">
                        <label
                          htmlFor="username"
                          className="block text-small font-description text-text-700 mb-1.5 group-focus-within:text-primary-500 transition-colors duration-200"
                        >
                          Username
                        </label>
                        <div className="relative rounded-xl shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-primary-500">@</span>
                          </div>
                          <input
                            type="text"
                            name="username"
                            id="username"
                            value={profileData.username}
                            onChange={handleInputChange}
                            className="block w-full pl-8 pr-4 py-3 bg-white border border-text-300 rounded-xl text-text-800 placeholder-text-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 transition-all duration-300 hover:bg-primary-100/50 font-description text-small"
                            disabled={isUpdatingUser || isUpdatingImage}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 sm:mt-7 md:mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setProfileData(originalProfileData);
                          setErrorMessage("");
                          setSuccessMessage("");
                        }}
                        className="w-full sm:w-auto px-4 sm:px-5 py-2.5 border-2 rounded-[10px] shadow-sm text-sm sm:text-base font-heading text-text-700 bg-white hover:bg-text-100 transition-all duration-300 hover:shadow-md"
                        style={{ borderColor: "#E5E7EB" }}
                        disabled={isUpdatingUser || isUpdatingImage}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUpdatingUser || isUpdatingImage}
                        className={`w-full sm:w-auto px-4 sm:px-5 py-2.5 border rounded-[10px] shadow-md text-sm sm:text-base font-heading text-white transition-all duration-300 hover:shadow-md bg-primary-500 border-primary-500 ${
                          isUpdatingUser || isUpdatingImage
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {isUpdatingUser || isUpdatingImage ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin h-5 w-5 mr-2"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                              />
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          "Save Profile"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float0 {
            0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.3; }
            100% { transform: translateY(-40px) rotate(360deg); opacity: 0; }
          }
          @keyframes float1 {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-30px) translateX(20px) rotate(180deg); opacity: 0.3; }
            100% { transform: translateY(-60px) translateX(40px) rotate(360deg); opacity: 0; }
          }
          @keyframes float2 {
            0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.7; }
            50% { transform: translateY(-40px) translateX(-20px) rotate(180deg); opacity: 0.3; }
            100% { transform: translateY(-80px) translateX(-40px) rotate(360deg); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Profile;