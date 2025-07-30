const Event = require("../models/eventModel");
const { upload, uploadToCloudinary } = require("../config/cloudinaryConfig");

exports.createEvent = async (req,res) => {
    try{
        const {eventDetails,image} = req.body;
        const teacherId = req.user.userId;
        const newEvent = await Event.create({teacherId,eventDetails,image});
        if(!newEvent) return res.status(400).json({message:"Event not created"});

        return res.status(201).json({status:200,message:"Event created successfully", event: newEvent});
    }catch(error){
        return res.status(500).json({message:"Error Creating Event", error:error.message});
    }
}

exports.getAllEvent = async (req,res) => {
    try {
        const getEvents = await Event.find({teacherId: req.user.userId});
        if(!getEvents) return res.status(400).json({message:"No events found"});

        return res.status(200).json({status:200,message:"Events fetched successfully", events: getEvents});
    } catch (error) {
        return res.status(500).json({message:"Error Getting All Events", error:error.message});
    }
}

exports.getSpecificEvent = async (req,res) => {
    try {
        const getSpecificEvent = await Event.findById(req.params.id);
        if(!getSpecificEvent) return res.status(400).json({message:"Event not found"});

        return res.status(200).json({status:200,message:"Event fetched successfully", event: getSpecificEvent});
    } catch (error) {
        return res.status(500).json({message:"Error Getting Specific Event", error:error.message});
    }
}

exports.updateEvent = async (req,res) => {
    try {
        const id = req.params.id;
        const updateEvent = await Event.findByIdAndUpdate(id,req.body,{new:true});
        if (!updateEvent) return res.status(400).json({ message: "Event not found" });

        return res
        .status(200)
        .json({
            status:200,
            message: "Event updated successfully",
            event: updateEvent,
        });
    } catch (error) {
        return res.status(500).json({message:"Error updating Event", error:error.message});
    }
}

exports.deleteEvent = async (req,res) => {
    try{
        const deleteEvent = await Event.findByIdAndDelete(req.params.id);
        if(!deleteEvent) return res.status(400).json({message:"Event not found"});

        return res.status(200).json({status:200,message:"Event deleted successfully",event:deleteEvent});
    } catch (error) {
        return res.status(500).json({message:"Error Deleting Event", error:error.message})
    }
}

exports.uploadEventImage = async (req, res) => {
  try {
    upload.single("image")(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Validate following extensions (case-insensitive)
      const fileName = req.file.originalname || req.file.filename;

      if (!fileName || !/\.(jpg|jpeg|png|webp|svg)$/i.test(fileName)) {
        return res
          .status(400)
          .json({
            message:
              "Only images with extensions .jpg, .jpeg, .png, .webp, .svg are allowed",
          });
      }

      try {
        const result = await uploadToCloudinary(req.file);
        res.status(201).json({
          message: "Image uploaded successfully",
          imageUrl: result.secure_url,
        });
      } catch (cloudErr) {
        console.error("Upload Error:", cloudErr);
        res
          .status(500)
          .json({ message: "Upload failed", error: cloudErr.message });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error uploading image", error: error.message });
  }
};

