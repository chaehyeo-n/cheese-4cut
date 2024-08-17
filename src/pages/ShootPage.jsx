// src/pages/ShootPage.jsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmotionDetection } from '../hooks/useEmotionDetection';

const ShootPage = ({ setCapturedPhotos }) => {
  const videoRef = useRef();
  const navigate = useNavigate();
  const { detectEmotion } = useEmotionDetection();

  useEffect(() => {
    const setupCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    };

    setupCamera();
    const interval = setInterval(async () => {
      const emotion = await detectEmotion(videoRef.current);
      // 감정 인식 로직 추가
      // 예시: 감정이 행복일 때 사진 찍기
      if (emotion && emotion.expression === 'happy' && emotion.confidence > 0.5) {
        takePhoto();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [detectEmotion]);

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    const photo = canvas.toDataURL('image/png');
    setCapturedPhotos(prev => [...prev, photo]);
    // 사진 찍은 후 다른 행동 추가
  };

  return (
    <div>
      <h1>촬영 페이지</h1>
      <video ref={videoRef} width="640" height="480" autoPlay />
      {/* 추가 UI 요소 및 상태 표시 */}
    </div>
  );
};

export default ShootPage;
