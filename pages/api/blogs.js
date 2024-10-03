import {mongooseConnect} from "../../lib/mongoose";
import Blog from "../../models/blogs";


export default async function handler(req, res) {
    const { method } = req;
    const { page = 1, limit = 10, search = '' } = req.query;
    await mongooseConnect();
  
    switch (method) {
      case 'GET':
        if(req.query?.title){
          const blogs = await Blog.findOne({title:req.query.title})
          res.status(200).json({ success: true, data: blogs });
        }
        try {
          const blogs = await Blog.find({});
          res.status(200).json({ success: true, data: blogs });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const blogs = await Blog.create(req.body);
          res.status(201).json({ success: true, data: blogs });
        } catch (error) {
          //console.log(error);
          res.status(400).json({ success: false });
        }
        break;
      case 'PUT':
        try {
          //console.log(req.body)
          const {title} = req.body;
          const blogs = await Blog.updateOne({ title },{ $set: req.body });
          res.status(201).json({ success: true, data: blogs,message: "Data Updated successfully" });
        } catch (error) {
          //console.log(error);
          res.status(400).json({ success: false,message: "Something went wrong"});
          
        }
        break;
        
      case 'DELETE':
        if (req.query?.title) {
          await Blog.deleteOne({title:req.query?.title});
          res.json(true);
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  }
  