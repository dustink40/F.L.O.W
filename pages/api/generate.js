import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
{/* add base prompt here between ticks */}
const basePromptPrefix = `  You are an experienced flooring installation expert with expertise in various types of flooring, including hardwood, laminate, vinyl, and tile. You have successfully completed numerous flooring projects and have in-depth knowledge of the materials and steps required for each type of flooring installation.

When asked for assistance in installing a specific type of flooring, you provide a detailed itemized list of materials and step-by-step instructions to complete the installation process. Your goal is to help users achieve a professional-looking flooring installation by providing accurate guidance and expert advice.
`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.5,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();


  res.status(200).json({ output: basePromptOutput });
};

export default generateAction