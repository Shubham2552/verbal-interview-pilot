
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

const HomeEnvironment: React.FC = () => {
  return (
    <group>
      {/* Room walls */}
      <mesh position={[0, 0, -8]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>
      
      {/* Floor */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Desk */}
      <group position={[0, -1.5, -2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[6, 0.2, 3]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        {/* Desk legs */}
        <mesh position={[-2.5, -1, -1]}>
          <cylinderGeometry args={[0.1, 0.1, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[2.5, -1, -1]}>
          <cylinderGeometry args={[0.1, 0.1, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[-2.5, -1, 1]}>
          <cylinderGeometry args={[0.1, 0.1, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[2.5, -1, 1]}>
          <cylinderGeometry args={[0.1, 0.1, 2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      </group>
      
      {/* Laptop on desk */}
      <group position={[1, -1.2, -1]}>
        <mesh rotation={[-0.2, 0.3, 0]}>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>
        <mesh position={[0, -0.02, 0.4]} rotation={[1.37, 0.3, 0]}>
          <boxGeometry args={[1.2, 0.05, 0.8]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>
      </group>
      
      {/* Bookshelf */}
      <group position={[-6, 0, -6]}>
        <mesh>
          <boxGeometry args={[2, 8, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Books */}
        <mesh position={[0, 2, 0.6]}>
          <boxGeometry args={[0.8, 0.3, 0.1]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh position={[0, 1.5, 0.6]}>
          <boxGeometry args={[0.6, 0.3, 0.1]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
        <mesh position={[0, 1, 0.6]}>
          <boxGeometry args={[0.7, 0.3, 0.1]} />
          <meshStandardMaterial color="#45b7d1" />
        </mesh>
      </group>
      
      {/* Window with light */}
      <group position={[6, 2, -7]}>
        <mesh>
          <planeGeometry args={[3, 4]} />
          <meshBasicMaterial color="#87CEEB" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[2.8, 3.8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      </group>
      
      {/* Plant */}
      <group position={[4, -2, -3]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 1]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.8, 8, 6]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      </group>
    </group>
  );
};

const DetailedInterviewerAvatar: React.FC<{
  isActive: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  personality: string;
  position: [number, number, number];
}> = ({ isActive, isSpeaking, audioLevel, personality, position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const eyesRef = useRef<THREE.Group>(null!);
  const mouthRef = useRef<THREE.Mesh>(null!);
  const hairRef = useRef<THREE.Mesh>(null!);
  
  // Personality-based colors and features
  const personalityColors = {
    professional: { skin: '#FDBCB4', hair: '#8B4513', clothes: '#4F46E5' },
    friendly: { skin: '#F4C2A1', hair: '#DAA520', clothes: '#10B981' },
    technical: { skin: '#E8C5A0', hair: '#2F4F4F', clothes: '#F59E0B' },
    creative: { skin: '#F7D1C4', hair: '#800080', clothes: '#EF4444' }
  };
  
  const colors = personalityColors[personality as keyof typeof personalityColors] || personalityColors.professional;
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
      
      // Active state subtle rotation
      if (isActive) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      }
    }
    
    // Natural blinking animation
    if (eyesRef.current) {
      const blinkTime = Math.sin(state.clock.elapsedTime * 2);
      if (blinkTime > 0.98) {
        eyesRef.current.scale.y = 0.1;
      } else {
        eyesRef.current.scale.y = 1;
      }
    }
    
    // Enhanced mouth animation when speaking
    if (mouthRef.current && isSpeaking) {
      const talkAnimation = Math.sin(state.clock.elapsedTime * 15) * audioLevel;
      mouthRef.current.scale.y = 1 + talkAnimation * 0.5;
      mouthRef.current.scale.x = 1 + talkAnimation * 0.3;
    }
    
    // Hair movement
    if (hairRef.current) {
      hairRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });
  
  return (
    <group position={position}>
      {/* Enhanced head with skin tone */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={colors.skin}
          metalness={0.1}
          roughness={0.8}
          emissive={isActive ? colors.clothes : '#000000'}
          emissiveIntensity={isActive ? 0.1 : 0}
        />
      </mesh>
      
      {/* Hair */}
      <mesh ref={hairRef} position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[1.1, 16, 16]} />
        <meshStandardMaterial color={colors.hair} roughness={0.9} />
      </mesh>
      
      {/* Eyes with more detail */}
      <group ref={eyesRef} position={[0, 0.2, 0.8]}>
        {/* Eye whites */}
        <mesh position={[-0.25, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.25, 0, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.25, 0, 0.1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.25, 0, 0.1]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        {/* Eyebrows */}
        <mesh position={[-0.25, 0.15, 0.05]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>
        <mesh position={[0.25, 0.15, 0.05]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.3, 0.05, 0.02]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>
      </group>
      
      {/* Nose */}
      <mesh position={[0, 0, 0.9]}>
        <coneGeometry args={[0.08, 0.2, 8]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      
      {/* Enhanced mouth */}
      <mesh ref={mouthRef} position={[0, -0.3, 0.8]}>
        <sphereGeometry args={[0.15, 16, 8]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-1, 0.1, 0.2]}>
        <sphereGeometry args={[0.15, 8, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      <mesh position={[1, 0.1, 0.2]}>
        <sphereGeometry args={[0.15, 8, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.6]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      
      {/* Torso/Shirt */}
      <mesh position={[0, -2, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1.2, 1.5]} />
        <meshStandardMaterial color={colors.clothes} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-1.2, -2, 0]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 1.8]} />
        <meshStandardMaterial color={colors.clothes} />
      </mesh>
      <mesh position={[1.2, -2, 0]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 1.8]} />
        <meshStandardMaterial color={colors.clothes} />
      </mesh>
      
      {/* Hands */}
      <mesh position={[-1.7, -2.8, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      <mesh position={[1.7, -2.8, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      
      {/* Collar */}
      <mesh position={[0, -1.4, 0.3]}>
        <boxGeometry args={[0.8, 0.2, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Tie (for professional personality) */}
      {personality === 'professional' && (
        <mesh position={[0, -1.8, 0.4]}>
          <boxGeometry args={[0.15, 0.8, 0.05]} />
          <meshStandardMaterial color="#000080" />
        </mesh>
      )}
      
      {/* Glasses (for technical personality) */}
      {personality === 'technical' && (
        <group position={[0, 0.1, 0.7]}>
          <mesh position={[-0.3, 0, 0]}>
            <torusGeometry args={[0.15, 0.02, 8, 16]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <torusGeometry args={[0.15, 0.02, 8, 16]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 0.4]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        </group>
      )}
      
      {/* Voice visualization rings when speaking */}
      {isSpeaking && (
        <>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.5, 1.8, 16]} />
            <meshBasicMaterial 
              color={colors.clothes} 
              transparent 
              opacity={0.3 + audioLevel * 0.4}
            />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <ringGeometry args={[2.0, 2.3, 16]} />
            <meshBasicMaterial 
              color={colors.clothes} 
              transparent 
              opacity={0.2 + audioLevel * 0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <ringGeometry args={[2.5, 2.8, 16]} />
            <meshBasicMaterial 
              color={colors.clothes} 
              transparent 
              opacity={0.1 + audioLevel * 0.2}
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
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 60 }}
        shadows
      >
        {/* Enhanced lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        <spotLight 
          position={[0, 15, 5]} 
          angle={0.3}
          intensity={0.8}
          castShadow
        />
        
        {/* Home environment */}
        <HomeEnvironment />
        
        {/* Detailed interviewer avatar */}
        <DetailedInterviewerAvatar
          isActive={isActive}
          isSpeaking={isSpeaking}
          audioLevel={audioLevel}
          personality={personality}
          position={position}
        />
        
        {/* Better environment */}
        <Environment preset="apartment" />
      </Canvas>
      
      {/* Enhanced interviewer info overlay */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white border border-white/20">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${
            isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
          }`} />
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-gray-300">{role}</p>
            <p className="text-xs text-blue-300 capitalize">{personality}</p>
          </div>
        </div>
      </div>
      
      {/* Enhanced audio visualization */}
      {isSpeaking && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-2">
          <div className="flex items-center space-x-1">
            <span className="text-xs text-white mr-2">Speaking</span>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-green-400 to-blue-400 rounded-full animate-pulse"
                style={{
                  height: `${15 + Math.random() * audioLevel * 25}px`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
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
