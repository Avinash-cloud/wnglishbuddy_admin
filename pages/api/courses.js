import { mongooseConnect } from "../../lib/mongoose";
import Courses from "../../models/Courses";

export default async function handler(req, res) {
  const { method } = req;
  const { page = 1, limit = 10, search = '' } = req.query;
  await mongooseConnect();

  switch (method) {
    case "GET":
      try {
        const query = search
          ? { name: { $regex: search, $options: "i" } } // Search by name
          : {};

        const totalItems = await Courses.countDocuments(query);
        const courses = await Courses.find(query)
          .skip((page - 1) * limit)
          .limit(Number(limit));

        res.status(200).json({ courses, totalItems });
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
      break;
    case "POST":
      try {

        
        const Coursess = await Courses.create(req.body);
        res.status(201).json({ success: true, data: Coursess });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false,message:"unable to Crete new course" });
      }
      break;
    case "PUT":
      try {
        console.log(req.body);
        const { title } = req.body;
        const Coursess = await Courses.updateOne({ title }, { $set: req.body });
        res
          .status(201)
          .json({
            success: true,
           
            message: "Data Updated successfully",
          });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ success: false, message: "Something went wrong" });
      }
      break;

    case "DELETE":
      if (req.query?.title) {
        await Courses.deleteOne({ title: req.query?.title });
        res.json(true);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
