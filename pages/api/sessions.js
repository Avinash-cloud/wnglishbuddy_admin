import { mongooseConnect } from '../../lib/mongoose';
import Session from '../../models/Session';

export default async function handler(req, res) {
  await mongooseConnect();

  // Handling GET, POST, PUT, DELETE requests
  switch (req.method) {
    // GET: Fetch all sessions
    case 'GET':
      try {
        const sessions = await Session.find(); // Fetch all sessions
        res.status(200).json(sessions);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching sessions' });
      }
      break;

    // POST: Create a new session
    case 'POST':
      try {
        const newSession = new Session(req.body); // Create a new session from request body
        await newSession.save(); // Save the new session
        res.status(201).json(newSession); // Return the newly created session
      } catch (error) {
        res.status(500).json({ error: 'Error creating session' });
      }
      break;

    // PUT: Update an existing session
    case 'PUT':
      try {
        const { id } = req.query; // Extract the session ID from the query params
        const updatedSession = await Session.findByIdAndUpdate(id, req.body, {
          new: true, // Return the updated session
          runValidators: true, // Validate the update
        });
        if (!updatedSession) {
          return res.status(404).json({ error: 'Session not found' });
        }
        res.status(200).json(updatedSession); // Return the updated session
      } catch (error) {
        res.status(500).json({ error: 'Error updating session' });
      }
      break;

    // DELETE: Delete an existing session
    case 'DELETE':
      try {
        const { id } = req.query; // Extract the session ID from the query params
        const deletedSession = await Session.findByIdAndDelete(id);
        if (!deletedSession) {
          return res.status(404).json({ error: 'Session not found' });
        }
        res.status(200).json({ message: 'Session deleted successfully' }); // Confirm deletion
      } catch (error) {
        res.status(500).json({ error: 'Error deleting session' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' }); // Handle unsupported HTTP methods
  }
}
