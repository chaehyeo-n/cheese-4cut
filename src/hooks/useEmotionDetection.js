import * as faceapi from 'face-api.js';
import { useEffect, useState } from 'react';

export const useEmotionDetection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';    //모델 불러옴
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      setLoaded(true);
    };

    loadModels();
  }, []);

  const detectEmotion = async (videoElement) => {
    if (!loaded) return null;

    const detections = await faceapi  //에싱크 함수의 Promise값이 바뀔때 실행됨
      .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections && detections.expressions) {
      // 감정 데이터에서 가장 높은 확률을 가진 감정을 찾음
      const maxExpression = Object.keys(detections.expressions).reduce((a, b) =>
        detections.expressions[a] > detections.expressions[b] ? a : b
      );
      //가장 높은 확률을 가진 감정(maxExpression)과 그 확률(confidence)을 객체 형태로 반환
      return { expression: maxExpression, confidence: detections.expressions[maxExpression] };
    }
    return null;
  };

  return { detectEmotion };
};
