const {Add_AssignmentCordi_Assign_Model} = require ("../../DatabaseSetup/Mongoose.Cordi.Assign.Schema");
const Upload_Assignment_Cordi_Function =async(req,res,next)=>{
    const {Res_Topic_Name,Res_Desc,Res_Mentor_Name,Res_Coordinator_Name,Res_Coordinator,Res_Group_Name,Res_Upload_Date}=req.body;
    console.log(req.body);

    // Validate required fields
    if (!Res_Coordinator) {
        return res.status(400).json({
            status: "Error",
            message: "Coordinator authorization required",
        });
    }

    if (!Res_Topic_Name || Res_Topic_Name.trim() === "") {
        return res.status(400).json({
            status: "Error",
            message: "Topic name is required",
        });
    }

    if (!Res_Desc || Res_Desc.trim() === "") {
        return res.status(400).json({
            status: "Error",
            message: "Description is required",
        });
    }

    try {
        // Check if this assignment already exists
        const existingAssignment = await Add_AssignmentCordi_Assign_Model.findOne({
            Topic_Name: Res_Topic_Name,
            Group_Name: Res_Group_Name,
            Desc: Res_Desc,
            Coordinator_Name: Res_Coordinator_Name
        });

        if (existingAssignment) {
            console.log("Assignment already exists");
            return res.status(409).json({
                status: "Error",
                message: "This assignment has already been created.",
            });
        }

        const Saved_Student_Data = await Add_AssignmentCordi_Assign_Model.create({
            Topic_Name:Res_Topic_Name,
            Desc:Res_Desc,
            Mentor_Name:Res_Mentor_Name,
            Coordinator_Name:Res_Coordinator_Name,
            Coordinator:Res_Coordinator,
            Group_Name:Res_Group_Name,
            Upload_Date:Res_Upload_Date,
            Approved: true,

        });
        if(Saved_Student_Data){
            console.log("Saved_Student_Data",Saved_Student_Data);
            res.status(200).json({
                status: "Success",
                message: "Assignment created by coordinator !",
                data: Saved_Student_Data,
              });
        }else{
            res.status(500).json({
                status: "Error",
                message: "Unable to create Assignment !",
              });
        }
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({
            status: "Error",
            message: "Server error while creating assignment",
            error: error.message,
        });
    }
}

module.exports={
    Upload_Assignment_Cordi_Function,
}
