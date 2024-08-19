import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmotionDetection } from '../hooks/useEmotionDetection';
import LoadingPage from './LoadingPage';
import * as S from '../styles/commonStyle';

const ShootPage = ({ setCapturedPhotos }) => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리
  const [currentEmotion, setCurrentEmotion] = useState(null);
  const videoRef = useRef();
  const navigate = useNavigate();
  const { detectEmotion } = useEmotionDetection();

  useEffect(() => {
    const setupCamera = async () => {       //카메라 설정
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        videoRef.current.onloadeddata = () => { // 비디오가 로드되면
          setIsLoading(false); // 로딩 상태를 false로 설정
        };
      } catch (error) {
        console.error("Camera setup failed:", error);
        setIsLoading(false); // 오류가 발생해도 로딩 상태를 false로 설정
      }
    };

    setupCamera();

    const interval = setInterval(async () => {
      const detectedEmotion = await detectEmotion(videoRef.current);
      setCurrentEmotion(detectedEmotion);  //currentEmotion은 객체 [expression, confidence]
      // 감정 인식 로직 추가
      if (currentEmotion && currentEmotion.expression === 'happy' && currentEmotion.confidence > 0.5) {
        takePhoto();
      }
    }, 500); //0.5초마다 감정인식 수행

    return () => clearInterval(interval);
  }, []);

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);
    const photo = canvas.toDataURL('image/png');
    setCapturedPhotos(prev => [...prev, photo]);
  };

  if (isLoading) {
    return <LoadingPage />; // 비디오 로드 중일 때 로딩 페이지 표시
  }

  return (
    <div>
      <h1>촬영 페이지</h1>
      <S.CenterRowBox>
        <h3>0/4</h3>
        <video
          ref={videoRef}
          autoPlay
          style={{
            width: "640",
            height: "480",
            transform: 'rotateY(180deg)'
          }}
        />
        
        <h3>8s</h3>
      </S.CenterRowBox>
      <h3>현재 감정 : {currentEmotion ? currentEmotion.expression : '인식되지 않음'} </h3>
      {/* 추가 UI 요소 및 상태 표시 */}
    </div>
  );
};

export default ShootPage;
