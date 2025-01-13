import { mongooseConnect } from "../../lib/mongoose";
import Tutor from "../../models/Tutor";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    await mongooseConnect();

    const { method } = req;
    const { id } = req.query;    

    if (method === "GET") {

        if(id){
            const tutor = await Tutor.findById(id);
            if (!tutor) return res.status(404).json({ success: false, message: "Tutor not found" });
            res.status(200).json({ success: true, data: tutor });
        }
        try {
            const { page = 1, limit = 10, search = "" } = req.query; // Destructure query parameters with defaults
            const query = search
                ? { name: { $regex: search, $options: "i" } } // Case-insensitive search for 'name'
                : {};

            // Calculate pagination
            const skip = (page - 1) * limit;

            // Fetch total count and filtered results
            const total = await Tutor.countDocuments(query);
            const students = await Tutor.find(query)
                .skip(skip)
                .limit(Number(limit));

            res.status(200).json({
                success: true,
                data: students,
                pagination: {
                    total,
                    page: Number(page),
                    limit: Number(limit),
                },
            });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
    else if (method === "POST") {
        try {
            const tutor = await Tutor.create(req.body);
            res.status(201).json({ success: true, data: tutor });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }

    }
    else if (method === "PUT") {
        try {
            const tutor = await Tutor.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).json({ success: true, data: tutor });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    } else if (method === "DELETE") {
        try {
            const tutor = await Tutor.findByIdAndDelete(id);
            if (!tutor) return res.status(404).json({ success: false, message: "Tutor not found" });
            res.status(200).json({ success: true, data: {} });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }

}