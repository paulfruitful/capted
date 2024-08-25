import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import { unlink } from 'fs';
import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

// Set the path to the local ffmpeg binary
const ffmpegPath = process.env.FFMPEG_PATH;
ffmpeg.setFfmpegPath(ffmpegPath);

export async function POST(request) {
  try {
    const { videoPath } = await request.json();

    if (!videoPath) {
      throw new Error('Video URL is not provided');
    }

    const tempFileName = uuidv4() + '.mp4';
    const tempFilePath = path.join(process.cwd(), 'tmp', tempFileName);
    const outputDirectory = path.join(process.cwd(), 'public', 'audio');
    const outputPath = path.join(outputDirectory, 'output.mp3');

    await fs.promises.mkdir(path.dirname(tempFilePath), { recursive: true });
    await fs.promises.mkdir(outputDirectory, { recursive: true });

    const response = await fetch(videoPath);
    if (!response.ok) {
      throw new Error('Failed to download video');
    }
    const buffer = await response.buffer();
    await fs.promises.writeFile(tempFilePath, buffer);

    const processVideo = () =>
      new Promise((resolve, reject) => {
        ffmpeg(tempFilePath)
          .output(outputPath)
          .on('end', () => resolve('Processing complete'))
          .on('error', (err) => {
            console.error('Error during video processing:', err);
            reject(err);
          })
          .run();
      });

    const result = await processVideo();

    unlink(tempFilePath, (err) => {
        if (err) {
          console.error('Error deleting temporary file:', err);
        } else {
          console.log('Temporary file deleted successfully');
        }
      });

    return NextResponse.json({ message: result });

  } catch (error) {
    console.error('Error in video processing endpoint:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
