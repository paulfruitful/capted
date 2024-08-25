import { NextResponse } from 'next/server';
import ffmpeg from 'fluent-ffmpeg';
import { promises as fs } from 'fs';
import path from 'path';
const ffmpegPath = 'C:\\ffmpeg\\ffmpeg-2024-08-21-git-9d15fe77e3-essentials_build\\bin\\ffmpeg.exe'; // Update this path to where ffmpeg is installed
ffmpeg.setFfmpegPath(ffmpegPath);
export async function POST(request) {
  try {
    const { videoPath } = await request.json();

    if (!videoPath) {
      throw new Error('Video path is not provided');
    }

    const outputDirectory = path.join(process.cwd(), 'public', 'audio');
    const outputPath = path.join(outputDirectory, 'output.mp3');

    await fs.mkdir(outputDirectory, { recursive: true });

    const processVideo = () =>
      new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .output(outputPath)
          .on('end', () => resolve('Processing complete'))
          .on('error', (err) => {
            console.error('Error during video processing:', err);
            reject(err);
          })
          .run();
      });

    const result = await processVideo();
    return NextResponse.json({ message: result });

  } catch (error) {
    console.error('Error in video processing endpoint:', error); 
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
