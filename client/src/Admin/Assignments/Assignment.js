import React from "react";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Modal } from "react-bootstrap";
import AssignmentsList from "./AssignmentsList";

const Assignment = () => {
  const BASEURL = process.env.REACT_APP_SAMPLE;
  const cookies = new Cookies();
  const [listofAssignments, setListOfAssignments] = useState("");
  const [showListOfMeetings, setShowListOfMeetings] = useState(false);
  const [mentorsList, setMentorsList] = useState({ data: [] });

  // Admin mapping object
  const ADMIN_MAPPING = {
    "vinitinamkekse@gmail.com": 0,
    "pallavi.soman@keystonesoe.in": 1,
    "jayshree.pawar@keystonesoe.in": 2,
    "mandarsoman28@gmail.com": 3,
    "nitin.deshpande@keystonesoe.in": 4,
    "prashant.babar@keystonesoe.in": 5,
    "sahya.pandey@keystonesoe.in": 6,
    "dean.tnp@keystonesoe.in": 7, // Super admin can see all mentors
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASEURL}/ViewMentorList`;

        const token = cookies.get("KeyToken");
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const currentAdminEmail = tokenPayload.New_User_Details.emailId;
        const currentAdminId = ADMIN_MAPPING[currentAdminEmail];

        const response = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: cookies.get("KeyToken"),
            },
          }
        );

        // If admin ID is 0, show all mentors, otherwise filter by Associated_Admins
        const filteredMentors =
          currentAdminId === 0
            ? response.data.data
            : response.data.data.filter(
                (mentor) => mentor.Associated_Admins === currentAdminId
              );

        setMentorsList({ data: filteredMentors });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const fetchAssignmentDetails = async (data) => {
    try {
      const response = await axios.post(
        `${BASEURL}/ViewPendingAssignmentByMentor`,
        {
          Res_Group_Name: data.Mentor_Group_Name,
        },
        {
          headers: {
            Authorization: cookies.get("KeyToken"),
          },
        }
      );
      setListOfAssignments({ data: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMeetingsClose = () => {
    setShowListOfMeetings(false);
  };

  return (
    <div
      className="p-4"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "center",
        gap: 10,
      }}
    >
      {mentorsList.data.map((element) => {
        return (
          <div key={element._id} className="counterCard">
            <div className="header">
              <div className="img-box img-box2">
                <span />
              </div>
              <h1 className="title">{element.Mentor_Group_Name}</h1>
              <h2 style={{ color: "white" }}>{element.Mentor_Name}</h2>
            </div>
            <div className="content">
              <button
                onClick={async () => {
                  await fetchAssignmentDetails(element);
                  setShowListOfMeetings(true);
                }}
                className="btn-link"
              >
                Show Assignments
              </button>
            </div>
          </div>
        );
      })}
      <Modal
        size="lg"
        show={showListOfMeetings}
        onHide={handleShowMeetingsClose}
        backdrop="static"
        keyboard={false}
        supportedorientations={["portrait", "landscape"]}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Mentees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AssignmentsList
            list={listofAssignments}
            closeModel={handleShowMeetingsClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Assignment;
