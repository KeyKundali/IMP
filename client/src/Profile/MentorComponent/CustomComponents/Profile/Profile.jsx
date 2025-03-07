import React, { useEffect, useState } from "react";
import defaultMentor from "../../../../assets/defaultmentorlogo.png";
import background from "./2.jpg";
import { Link } from "react-router-dom";
import Notification from "./Notification";

// Mentor Profiles
import Ajay_Kavade from "../../../../assets/Mentors_Profile/Ajay_Kavade.jpg"
import Amit_Ravankar from "../../../../assets/Mentors_Profile/Amit_Ravankar.jpg"
import Amod_Panchhapurkar from "../../../../assets/Mentors_Profile/Amod_Panchhapurkar.jpg"
import Amol_Nitave from "../../../../assets/Mentors_Profile/Amol_Nitave.jpg"
import Anil_Shukla from "../../../../assets/Mentors_Profile/Anil_Shukla.jpg"
import Archana_Joshi from "../../../../assets/Mentors_Profile/Archana_Joshi.jpg"
import Ashfak_Shaikh from "../../../../assets/Mentors_Profile/Ashfak_Shaikh.jpg"
import Dinesh_sant from "../../../../assets/Mentors_Profile/Dinesh_sant.jpg"
import Jitendra_Sardesai from "../../../../assets/Mentors_Profile/Jitendra_Sardesai.jpg"
import Kailash_Maisekar from "../../../../assets/Mentors_Profile/Kailash_Maisekar.jpg"
import Kaustubh_Kulkarni from "../../../../assets/Mentors_Profile/Kaustubh_Kulkarni.jpg"
import Krishnat_Molawade from "../../../../assets/Mentors_Profile/Krishnat_Molawade.jpg"
import Makarand_Damle from "../../../../assets/Mentors_Profile/Makarand_Damle.jpg"
import Milind_Boraste from "../../../../assets/Mentors_Profile/Milind_Boraste.jpg"
import Milind_Inamdar from "../../../../assets/Mentors_Profile/Milind_Inamdar.jpg"
import Milind_Mutalik from "../../../../assets/Mentors_Profile/Milind_Mutalik.jpg"
import Prashant_Dahibhate from "../../../../assets/Mentors_Profile/Prashant_Dahibhate.jpg"
import Prashant_Deshpande from "../../../../assets/Mentors_Profile/Prashant_Deshpande.jpg"
import Rahul_Lale from "../../../../assets/Mentors_Profile/Rahul_Lale.jpg"
import Sachin_Apte from "../../../../assets/Mentors_Profile/Sachin_Apte.jpg"
import Sandeep_gaikwad from "../../../../assets/Mentors_Profile/Sandeep_gaikwad.jpg"
import shridhar_nale from "../../../../assets/Mentors_Profile/shridhar_nale.jpg"
import Shrikant_Sarda from "../../../../assets/Mentors_Profile/Shrikant_Sarda.jpg"
import Sudhir_Patil from "../../../../assets/Mentors_Profile/Sudhir_Patil.jpg"
import Taral_Shah from "../../../../assets/Mentors_Profile/Taral_Shah.jpg"
import Vaibhav_Salunkhe from "../../../../assets/Mentors_Profile/Vaibhav_Salunkhe.jpg"
import Vishwesh_Shete  from "../../../../assets/Mentors_Profile/Vishwesh_Shete.jpg"


import axios from "axios";
import Cookies from "universal-cookie";


function Profile(props) {
  const { setEdit, mentorData, submissionStatus, setSubmissionStatus } = props;
  const [tNotes, setTNotes] = useState(0);
  const [pendingNotes, setpendingNotes] = useState(0);
  const [assignmentApproved, setassignmentApproved] = useState(0);
  const [assignmentsPending, setassignmentsPending] = useState(0);
  const [customMentorPic, setCustomeMentorPic]= useState("");
  const BASEURL = process.env.REACT_APP_SAMPLE;
  const cookies = new Cookies();

  //Mentor Profile Conditionals
  const DefaultImage = process.env.REACT_APP_DEFAULT_IMAGE;
  const CounterAssignmentStatus = async() => {
    if (mentorData.Mentor_Name==="Archana Joshi"){
      setCustomeMentorPic(Archana_Joshi);
    }else   if (mentorData.Mentor_Name==="Milind Mutalik"){
      setCustomeMentorPic(Milind_Mutalik);
    }else   if (mentorData.Mentor_Name==="Ashfak Shaikh"){
      setCustomeMentorPic(Ashfak_Shaikh)
    } else   if (mentorData.Mentor_Name==="Sachin Apte"){
      setCustomeMentorPic(Sachin_Apte)
    } else   if (mentorData.Mentor_Name==="Jitendra Sardesai"){
      setCustomeMentorPic(Jitendra_Sardesai);
    }else   if (mentorData.Mentor_Name==="Sudhir Patil"){
      setCustomeMentorPic(Sudhir_Patil);
    }else   if (mentorData.Mentor_Name==="Taral Shah"){
      setCustomeMentorPic(Taral_Shah);
    }else   if (mentorData.Mentor_Name==="Amit Ravankar"){
      setCustomeMentorPic(Amit_Ravankar);
    }else   if (mentorData.Mentor_Name==="Amod Panchhapurkar"){
      setCustomeMentorPic(Amod_Panchhapurkar);
    }else   if (mentorData.Mentor_Name==="Amol Nitave"){
      setCustomeMentorPic(Amol_Nitave);
    }else   if (mentorData.Mentor_Name==="Kailash Maisekar"){
      setCustomeMentorPic(Kailash_Maisekar);
    }else   if (mentorData.Mentor_Name==="Kaustubh Kulkarni"){
      setCustomeMentorPic(Kaustubh_Kulkarni);
    }else   if (mentorData.Mentor_Name==="Dinesh Sant"){
      setCustomeMentorPic(Dinesh_sant);
    }else   if (mentorData.Mentor_Name==="Krishnat Molawade"){
      setCustomeMentorPic(Krishnat_Molawade);
    }else if (mentorData.Mentor_Name==="Prashant Deshpande"){
      setCustomeMentorPic(Prashant_Deshpande);
    }else if (mentorData.Mentor_Name==="Vaibhav Salunkhe"){
      setCustomeMentorPic(Vaibhav_Salunkhe);
    }else if (mentorData.Mentor_Name==="Milind Inamdar"){
      setCustomeMentorPic(Milind_Inamdar);
    }else if (mentorData.Mentor_Name==="Rahul Lale"){
      setCustomeMentorPic(Rahul_Lale);
    }else if (mentorData.Mentor_Name==="Shrikant Sarda"){
      setCustomeMentorPic(Shrikant_Sarda);
    }else if (mentorData.Mentor_Name==="Vishwesh Shete"){ 
      setCustomeMentorPic(Vishwesh_Shete);
    }else if (mentorData.Mentor_Name==="Sandeep Gaikwad"){
      setCustomeMentorPic(Sandeep_gaikwad);
    }else if (mentorData.Mentor_Name==="Ajay Kavade"){
      setCustomeMentorPic(Ajay_Kavade);
    }else if (mentorData.Mentor_Name==="Anil Shukla"){
      setCustomeMentorPic(Anil_Shukla);
    }else if (mentorData.Mentor_Name==="Prashant Dahibhate"){
      setCustomeMentorPic(Prashant_Dahibhate);
      }else if (mentorData.Mentor_Name==="Shridhar Nale"){
      setCustomeMentorPic(shridhar_nale);
    }else if (mentorData.Mentor_Name==="Milind Boraste"){
      setCustomeMentorPic(Milind_Boraste);
    }else if (mentorData.Mentor_Name==="Makarand Damle"){
      setCustomeMentorPic(Makarand_Damle);
    }else{
      setCustomeMentorPic(defaultMentor);
    }
    //Calculate the notes counter
    let CountArray1 = submissionStatus.filter((obj) => obj.Approved === false);
    setpendingNotes(CountArray1.length);
    let CountArray2 = submissionStatus.filter((obj) => obj.Approved === true);
    setTNotes(CountArray2.length);

    //Calculate assignments counter
    const AssignmentData = await axios.post(
      `${BASEURL}/ViewPendingAssignmentByMentor`,
      {
        Res_Group_Name: mentorData.Mentor_Group_Name,
      },
      {
        headers: {
          Authorization: cookies.get("KeyToken"),
        },
      }
    );
    if (AssignmentData) {
      // console.log("AssignmentData", AssignmentData);
      setassignmentsPending(AssignmentData.data.data1.length);
      setassignmentApproved(AssignmentData.data.data2.length);
    }
  };
  // console.log("88888", mentorData);
  useEffect(() => {
    CounterAssignmentStatus();
  }, [submissionStatus, mentorData]);
  return (
    <>
      <div className="justify-center p-2 flex ">
        <div className="text-left  mainContainer ">
          <div className="rounded-2xl pb-3 section section1">
            <div className=" empty ">
              <div className=" profilebg ">
                <img src={background} alt="background" />
              </div>
              <div className="profileEdit">
                <div className="profile rounded-full">
                  <img
                    className="rounded-full"
                    src={customMentorPic|| DefaultImage}
                    alt="Mentor-pic"
                  />
                </div>
                <div className=" editProfileButton">
                  {/* <button
                    className="editButton"
                    type="button"
                    onClick={setEdit}
                  >
                    <span className="edit-icon"></span>
                  </button> */}
                </div>
              </div>
              <div className="profile-head ">
                <div className="nameOrg">
                  <div className=" profileName">
                    <div className=" ">
                      {mentorData.Mentor_Name
                        ? mentorData?.Mentor_Name
                        : "Mentor Name Here "}
                    </div>
                  </div>
                  <div className="Organization">
                    {/* Organization: */}
                    <div className="pl-2  ">
                      {mentorData?.Mentor_Organization
                        ? mentorData.Mentor_Organization
                        : "Mentor's Organization Here"}{" "}
                    </div>
                  </div>
                </div>
                <div className="personalProfile">
                  <div className=" ">
                    Position:{" "}
                    {mentorData?.Mentor_Position
                      ? mentorData.Mentor_Position
                      : "Mentor's Position Here"}
                  </div>
                  <div className="personalProfile">
                    {/* Qualification: */}
                    <span className=" ">
                      Qualification:{" "}
                      {mentorData?.Mentor_Qualification
                        ? mentorData.Mentor_Qualification
                        : "Mentor Qualification Here"}
                    </span>
                  </div>
                  <div className="personalProfile">
                    {/* Qualification: */}
                    <span className=" " style={{ color: "red" }}>
                      Group Name :{" "}
                      {mentorData?.Mentor_Group_Name
                        ? mentorData?.Mentor_Group_Name
                        : "Group Name Here"}
                    </span>
                  </div>
                </div>

                {/* <div>
                Experience:
                <span className="pl-2"> {initialValues.experience}</span>
              </div> */}
              </div>
              <div className="personalInfo">
                <p>Contact: &nbsp; </p>
                <span>{mentorData?.Mentor_Contact_Number} || &nbsp;</span>
                <span>
                  <a className="linkA" href="mailto:">
                    {mentorData?.Mentor_EmailId
                      ? mentorData.Mentor_EmailId
                      : " Mentor's Email ID"}
                  </a>{" "}
                  || &nbsp;
                </span>
                <span>
                  <a className="linkA" href="" target="_blank">
                    {mentorData?.Mentor_LinkedIn
                      ? mentorData.Mentor_LinkedIn
                      : "Mentor's LinkedIn"}
                  </a>{" "}
                </span>
              </div>
            </div>
          </div>
          <div className=" section section2">
            <div className="sectionHead">
              About
              <div className="aboutText">
                {mentorData?.Mentor_About
                  ? mentorData?.Mentor_About
                  : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."}
              </div>
            </div>
          </div>

          <div className="section section4   ">
            <div className="counterCard">
              <div className="header">
                <div className="img-box">
                  <span>{tNotes ? tNotes : 0}</span>
                </div>
                <h1 className="title">Approved Notes</h1>
              </div>
              <div className="content">
                <Link className="btn-link" to="/notes">
                  Read More...
                </Link>
              </div>
            </div>

            <div className="counterCard">
              <div className="header">
                <div className="img-box">
                  <span>{pendingNotes ? pendingNotes : 0}</span>
                </div>
                <h1 className="title">Pending Notes</h1>
              </div>
              <div className="content">
                <Link className="btn-link" to="/notes">
                  Read More...
                </Link>
              </div>
            </div>

            <div className="counterCard">
              <div className="header">
                <div className="img-box">
                  <span>{assignmentApproved ? assignmentApproved : 0}</span>
                </div>
                <h1 className="title assignments">Approved Assignments</h1>
              </div>
              <div className="content">
                <Link className="btn-link" to="/assignments">
                  Read More...
                </Link>
              </div>
            </div>
            <div className="counterCard">
              <div className="header">
                <div className="img-box">
                  <span>{assignmentsPending ? assignmentsPending : 0}</span>
                </div>
                <h1 className="title assignments">Pending Assignments</h1>
              </div>
              <div className="content">
                <Link className="btn-link" to="/assignments">
                  Read More...
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="justify-center p-2 notificationPanel">
          <Notification mentorData={mentorData} />
        </div>
      </div>
    </>
  );
}

export default Profile;
