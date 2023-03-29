import {
  Configuration,
  CreateChatCompletionResponse,
  CreateChatCompletionResponseChoicesInner,
  CreateCompletionResponseUsage,
  OpenAIApi,
} from 'openai';
import { Request, Response } from 'express';
import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
} from 'axios';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { prompt, size } = req.body;
  const imageSize =
    size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      status: 'Success',
      data: imageUrl,
    });
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    res.status(400).json({
      status: 'Fail',
      error: 'Image could not be generated',
    });
  }
};

interface Res extends AxiosResponse<CreateChatCompletionResponse, any> {
  data: CreateChatCompletionResponse;
  status: number;
  statusText: string;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  config: any;
  request?: any;
}

export const chat = async (req: Request, res: Response) => {
  const { prompt } = req.body;
  const response: Res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  // let aiRes;
  let object = response.data.choices[0].message;
  if (object !== undefined) {
    const aiRes = object.content.replace(/(\r\n|\n|\r)/gm, '');
    res.status(200).json({
      status: 'Success',
      response: aiRes,
    });
  }
};
