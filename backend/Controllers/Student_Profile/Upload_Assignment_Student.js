const {
  Add_AssignmentStudent_Assign_Model,
} = require("../../DatabaseSetup/Mongoose.Student.Assign.Schema ");
const Upload_Assignment_Student_Function = async (req, res, next) => {
  const {
    Res_Topic_Name,
    Res_Link,
    Res_Mentor_Name,
    Res_Student_Name,
    Res_Group_Name,
    Res_Upload_Date,
  } = req.body;
  console.log("kkkkkkk",req.body);

  // Validate required fields
  if (!Res_Student_Name) {
    return res.status(400).json({
      status: "Error",
      message: "Student name is required",
    });
  }

  if (!Res_Link || Res_Link.trim() === "") {
    return res.status(400).json({
      status: "Error",
      message: "Assignment link is required",
    });
  }

  if (!Res_Topic_Name) {
    return res.status(400).json({
      status: "Error",
      message: "Topic name is required",
    });
  }

  try {
    // Check if student already submitted this assignment with the same link
    const existingSubmission = await Add_AssignmentStudent_Assign_Model.findOne({
      Topic_Name: Res_Topic_Name,
      Student_Name: Res_Student_Name,
      Group_Name: Res_Group_Name,
      Link: Res_Link
    });

    if (existingSubmission) {
      console.log("Assignment already submitted by this student");
      return res.status(409).json({
        status: "Error",
        message: "You have already submitted this assignment with the same link.",
      });
    }

    const Saved_Student_Data = await Add_AssignmentStudent_Assign_Model.create({
      Topic_Name: Res_Topic_Name,
      Link: Res_Link,
      Mentor_Name: Res_Mentor_Name,
      Student_Name: Res_Student_Name,
      Group_Name: Res_Group_Name,
      Upload_Date: Res_Upload_Date,
      Approved: false,
    });

    if (Saved_Student_Data) {
      res.status(200).json({
        status: "Success",
        message: "Assignment uploaded by student !",
        data: Saved_Student_Data,
      });
      console.log("hhh",Saved_Student_Data);
    } else {
      res.status(500).json({
        status: "Error",
        message: "Unable to submit Assignment !",
      });
    }
  } catch (error) {
    console.error("Error uploading assignment:", error);
    res.status(500).json({
      status: "Error",
      message: "Server error while submitting assignment",
      error: error.message,
    });
  }
};

module.exports = {
  Upload_Assignment_Student_Function,
};
