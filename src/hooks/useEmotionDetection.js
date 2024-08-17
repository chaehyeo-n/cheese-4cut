import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react';

export const useEmotionDetection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setLoaded(true);
    };

    loadModels();
  }, []);

  const detectEmotion = async (videoElement) => {
    if (!loaded) return null;

    const detections = await faceapi
      .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections && detections.expressions) {
      const maxExpression = Object.keys(detections.expressions).reduce((a, b) =>
        detections.expressions[a] > detections.expressions[b] ? a : b
      );
      return { expression: maxExpression, confidence: detections.expressions[maxExpression] };
    }
    return null;
  };

  return { detectEmotion };
};
