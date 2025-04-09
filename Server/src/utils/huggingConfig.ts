import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const accessToken = process.env.HF_INFERENCE_ACCESS_TOKEN;
const hf = new HfInference(accessToken);
const modelName = process.env.MODEL_NAME;

export const AI = async (prompt: string) => {
  const response = hf.textGenerationStream({
    model_name: modelName,
    inputs: prompt,
    parameters: {
      max_new_tokens: 1000,
      do_sample: true,
      temperature: 0.5,
      top_k: 50,
      top_p: 0.95,
      num_return_sequences: 1,
    },
  });

  let result = "";
  for await (const chunk of response) {
    result += chunk.token.text;
    // console.log(chunk.token.text);
  }

  console.log("response", result);
  return result;
};
