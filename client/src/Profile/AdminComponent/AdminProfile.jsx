import "./AdminProfile.css";
import { Fragment, useEffect, useState } from "react";
import Cookies from "universal-cookie";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    contact: "",
    groups: [],
  });

  const ADMIN_MAPPING = {
    "vinitinamkekse@gmail.com": 0,
    "pallavi.soman@keystonesoe.in": 1,
    "jayshree.pawar@keystonesoe.in": 2,
    "mandar.soman@keystonesoe.in": 3,
    "nitin.deshpande@keystonesoe.in": 4,
    "prashant.babar@keystonesoe.in": 5,
    "sahya.pandey@keystonesoe.in": 6,
    "dean.tnp@keystonesoe.in": 7, // Super admin can see all mentors
  };

  // Contact mapping object
  const CONTACT_MAPPING = {
    0: "7709262997",
    1: "9881300499",
    2: "9922887755",
    3: "9764266189",
    4: "9130065701",
    5: "9423008584",
    6: "9765890111",
    7: "9595952524",
  };

  const GROUP_MAPPING = {
    0: ["All Groups"],
    1: ["KSE-IMP-G-1", "KSE-IMP-G-2", "KSE-IMP-G-3"],
    2: ["KSE-IMP-G-4", "KSE-IMP-G-5", "KSE-IMP-G-6", "KSE-IMP-G-7"],
    3: ["KSE-IMP-G-8", "KSE-IMP-G-9", "KSE-IMP-G-10", "KSE-IMP-G-11"],
    4: ["KSE-IMP-G-12", "KSE-IMP-G-13", "KSE-IMP-G-14", "KSE-IMP-G-15"],
    5: ["KSE-IMP-G-16", "KSE-IMP-G-17", "KSE-IMP-G-18", "KSE-IMP-G-19"],
    6: ["KSE-IMP-G-20", "KSE-IMP-G-21", "KSE-IMP-G-22", "KSE-IMP-G-23"],
    7: ["KSE-IMP-G-24", "KSE-IMP-G-25", "KSE-IMP-G-26", "KSE-IMP-G-27"],
  };

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("KeyToken");
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const adminDetails = tokenPayload.New_User_Details;
    const adminId = ADMIN_MAPPING[adminDetails.emailId];

    setAdminData({
      name: adminDetails.Name,
      email: adminDetails.emailId,
      contact: CONTACT_MAPPING[adminId] || "Not Available",
      groups: GROUP_MAPPING[adminId] || [],
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fe] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header with Avatar */}
        <div className="text-center py-10">
          <div className="inline-block mb-6">
            <div className="w-28 h-28 rounded-full bg-[#4263eb] flex items-center justify-center text-5xl font-bold text-white shadow-lg">
              {adminData.name.charAt(0)}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {adminData.name}
          </h1>
          <p className="text-xl text-gray-600">Administrator</p>
        </div>

        {/* Main Content Stack */}
        <div className="flex flex-col gap-8 mb-8">
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <svg
                className="w-8 h-8 text-[#4263eb] mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">
                Personal Information
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-lg font-medium text-gray-600 mb-2 block">
                  Email Address
                </label>
                <p className="text-xl text-gray-800 break-words">
                  {adminData.email}
                </p>
              </div>
              <div>
                <label className="text-lg font-medium text-gray-600 mb-2 block">
                  Contact Number
                </label>
                <p className="text-xl text-gray-800">{adminData.contact}</p>
              </div>
            </div>
          </div>

          {/* Associated Groups Card */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center mb-6">
              <svg
                className="w-8 h-8 text-[#4263eb] mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">
                Associated Groups
              </h2>
            </div>
            <div className="space-y-4">
              {adminData.groups.map((group, index) => (
                <div
                  key={index}
                  className="bg-[#4263eb] text-white rounded-lg px-6 py-4"
                >
                  <p className="text-xl font-medium text-center">{group}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-[#4263eb] mb-2">
              {adminData.groups.length}
            </div>
            <p className="text-lg text-gray-600 font-medium">Total Groups</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-[#4263eb] mb-2">Active</div>
            <p className="text-lg text-gray-600 font-medium">Status</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-[#4263eb] mb-2">Admin</div>
            <p className="text-lg text-gray-600 font-medium">Role</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
