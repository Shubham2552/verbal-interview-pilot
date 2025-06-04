
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Sphere, Box, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface AIInterviewerProps {
  name: string;
  role: string;
  isActive: boolean;
  isSpeaking: boolean;
  audioLevel?: number;
  personality?: 'professional' | 'friendly' | 'technical' | 'creative';
  position?: [number, number, number];
}

const InterviewerAvatar: React.FC<{
  isActive: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  personality: string;
  position: [number, number, number];
}> = ({ isActive, isSpeaking, audioLevel, personality, position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const eyesRef = useRef<THREE.Group>(null!);
  const mouthRef = useRef<THREE.Mesh>(null!);
  
  // Personality-based colors
  const personalityColors = {
    professional: '#4F46E5',
    friendly: '#10B981',
    technical: '#F59E0B',
    creative: '#EF4444'
  };
  
  const color = personalityColors[personality as keyof typeof personalityColors] || '#4F46E5';
  
  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Active state glow
      if (isActive) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      }
    }
    
    // Eye blinking animation
    if (eyesRef.current) {
      const blinkTime = Math.sin(state.clock.elapsedTime * 3);
      if (blinkTime > 0.95) {
        eyesRef.current.scale.y = 0.1;
      } else {
        eyesRef.current.scale.y = 1;
      }
    }
    
    // Mouth animation when speaking
    if (mouthRef.current && isSpeaking) {
      const talkAnimation = Math.sin(state.clock.elapsedTime * 10) * audioLevel;
      mouthRef.current.scale.y = 1 + talkAnimation * 0.3;
      mouthRef.current.scale.x = 1 + talkAnimation * 0.2;
    }
  });
  
  return (
    <group position={position}>
      {/* Main head */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={isActive ? color : '#000000'}
          emissiveIntensity={isActive ? 0.2 : 0}
        />
      </mesh>
      
      {/* Eyes */}
      <group ref={eyesRef} position={[0, 0.2, 0.8]}>
        <mesh position={[-0.3, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.3, 0, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.3, 0, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.3, 0, 0.1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
      
      {/* Mouth */}
      <mesh ref={mouthRef} position={[0, -0.3, 0.8]}>
        <sphereGeometry args={[0.2, 16, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Neck/Body */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.5, 0.8, 1, 8]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Voice visualization rings when speaking */}
      {isSpeaking && (
        <>
          <mesh position={[0, 0, 0]}>
            <ringGeometry args={[1.5, 1.7, 16]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.3 + audioLevel * 0.4}
            />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[1.8, 2.0, 16]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.2 + audioLevel * 0.3}
            />
          </mesh>
        </>
      )}
    </group>
  );
};

const AIInterviewer: React.FC<AIInterviewerProps> = ({
  name,
  role,
  isActive,
  isSpeaking,
  audioLevel = 0.5,
  personality = 'professional',
  position = [0, 0, 0]
}) => {
  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <spotLight position={[0, 10, 0]} angle={0.3} />
        
        <InterviewerAvatar
          isActive={isActive}
          isSpeaking={isSpeaking}
          audioLevel={audioLevel}
          personality={personality}
          position={position}
        />
        
        <Environment preset="city" />
      </Canvas>
      
      {/* Interviewer Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
          }`} />
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-gray-300">{role}</p>
          </div>
        </div>
      </div>
      
      {/* Audio Visualization */}
      {isSpeaking && (
        <div className="absolute top-4 right-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-green-400 rounded-full animate-pulse"
                style={{
                  height: `${20 + Math.random() * audioLevel * 30}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterviewer;
