import express from 'express';
import { AssistantsClient, AzureKeyCredential } from "@azure/openai-assistants";
import dotenv from 'dotenv';
import fs from 'fs';
import { extractPdfText } from '../utils/extractPdfText.js';
import { upload } from '../middleware/multer.js';
import { processWithAssistant } from '../config/assistant.js';

dotenv.config();

const router = express.Router();


// API Endpoint to analyze PDF
router.post('/analyze', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const question = req.body.question || null;
    const messages = await processWithAssistant(req.file.path, question);

    // Extract text content from messages
    const analysis = messages.map(message => {
      return {
        role: message.role,
        content: message.content.map(c => c.type === 'text' ? c.text.value : null).filter(Boolean)
      };
    });
    const assistanceResponse = analysis.map(message => {
      if(message.role == 'assistant')
        return message.content
      else
        return ""
    })

    const reducedResponse = assistanceResponse.reduce((res, message) => res+message+" ","").trim()
    res.json({
      success: true,
      analysis: reducedResponse
    });

  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/test-connection', async (req, res) => {
    try {
      const assistantsClient = new AssistantsClient(
        process.env.AZURE_OPENAI_ENDPOINT,
        new AzureKeyCredential(process.env.AZURE_OPENAI_KEY)
      );
      
      const assistant = await assistantsClient.createAssistant({
        model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
        name: "Test Assistant",
        instructions: "Test instructions"
      });
      
      res.json({
        success: true,
        message: 'Connection successful',
        assistantId: assistant.id
      });
    } catch (error) {
      console.error('Connection test failed:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
});

router.get("/testpdf", upload.single('pdf'), async (req, res) => {
  try{
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    const pdfContent = fs.readFileSync(req.file.path);
    console.log(pdfContent);
    const chunks = await extractPdfText(pdfContent)
    fs.unlinkSync(req.file.path);
    res.send(chunks)
  }catch(Err){
    console.log(Err);
    res.send("err")
    
  }
})

export default router;