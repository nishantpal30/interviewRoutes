import CreateProblemSubmission from "../../db/models/problem/createProblemSubmission.js";
import { eligibleChecker } from "../../repositories/problem/eligibleChecker.js";
import { problemCreationService } from "../../services/problem/problemCreation.service.js";
export const 
createProblem = async (req , res) =>{
    const userId = req.userId;
    const eligibleCheck = await eligibleChecker(userId);
    if(!eligibleCheck.success){
        return res.status(eligibleCheck.statusCode).json(eligibleCheck)
    }

    const { submissionType, problemId, content } = req.body;
    
    const problemCreationResponse = await problemCreationService(submissionType,problemId,content,eligibleCheck.userId,eligibleCheck.isAdmin)
}