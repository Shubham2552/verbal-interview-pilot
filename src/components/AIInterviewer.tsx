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

const OfficeEnvironment: React.FC = () => {
  return (
    <group>
      {/* Modern office background wall */}
      <mesh position={[0, 0, -12]} receiveShadow>
        <planeGeometry args={[25, 15]} />
        <meshStandardMaterial color="#f8f9fa" />
      </mesh>
      
      {/* Floor */}
      <mesh position={[0, -4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[25, 20]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      
      {/* Executive desk */}
      <group position={[0, -2, -3]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[8, 0.3, 4]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        {/* Desk legs */}
        <mesh position={[-3.5, -1.2, -1.5]}>
          <cylinderGeometry args={[0.15, 0.15, 2.4]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[3.5, -1.2, -1.5]}>
          <cylinderGeometry args={[0.15, 0.15, 2.4]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[-3.5, -1.2, 1.5]}>
          <cylinderGeometry args={[0.15, 0.15, 2.4]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[3.5, -1.2, 1.5]}>
          <cylinderGeometry args={[0.15, 0.15, 2.4]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>
      
      {/* Modern laptop */}
      <group position={[2, -1.6, -2]}>
        <mesh rotation={[-0.1, 0.2, 0]}>
          <boxGeometry args={[1.5, 1, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, -0.03, 0.5]} rotation={[1.47, 0.2, 0]}>
          <boxGeometry args={[1.5, 0.08, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </group>
      
      {/* Professional bookshelf */}
      <group position={[-8, 1, -8]}>
        <mesh>
          <boxGeometry args={[3, 10, 1.5]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        {/* Books */}
        <mesh position={[0, 3, 0.8]}>
          <boxGeometry args={[1.2, 0.4, 0.15]} />
          <meshStandardMaterial color="#c0392b" />
        </mesh>
        <mesh position={[0, 2.4, 0.8]}>
          <boxGeometry args={[1.0, 0.4, 0.15]} />
          <meshStandardMaterial color="#2980b9" />
        </mesh>
        <mesh position={[0, 1.8, 0.8]}>
          <boxGeometry args={[1.1, 0.4, 0.15]} />
          <meshStandardMaterial color="#27ae60" />
        </mesh>
      </group>
      
      {/* Large window with cityview */}
      <group position={[8, 3, -10]}>
        <mesh>
          <planeGeometry args={[4, 6]} />
          <meshBasicMaterial color="#87CEEB" transparent opacity={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[3.8, 5.8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      </group>
      
      {/* Professional plant */}
      <group position={[5, -2.5, -4]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.4, 1.2]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      </group>
      
      {/* Office chair behind */}
      <group position={[0, -2, 2]}>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.2]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        <mesh position={[0, 2.5, -0.3]}>
          <boxGeometry args={[1.2, 2, 0.2]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
      </group>
    </group>
  );
};

const DetailedRobertAvatar: React.FC<{
  isActive: boolean;
  isSpeaking: boolean;
  audioLevel: number;
  position: [number, number, number];
}> = ({ isActive, isSpeaking, audioLevel, position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const eyesRef = useRef<THREE.Group>(null!);
  const mouthRef = useRef<THREE.Mesh>(null!);
  const hairRef = useRef<THREE.Mesh>(null!);
  const leftArmRef = useRef<THREE.Mesh>(null!);
  const rightArmRef = useRef<THREE.Mesh>(null!);
  
  // Robert's professional appearance with theme colors
  const colors = {
    skin: '#FDBCB4',
    hair: '#2F4F4F',
    clothes: 'hsl(var(--primary))', // Use theme primary color
    tie: 'hsl(var(--destructive))' // Use theme destructive color
  };
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.03;
      
      // Professional slight head movements
      if (isActive) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
      }
    }
    
    // Natural blinking
    if (eyesRef.current) {
      const blinkTime = Math.sin(state.clock.elapsedTime * 1.5);
      if (blinkTime > 0.97) {
        eyesRef.current.scale.y = 0.1;
      } else {
        eyesRef.current.scale.y = 1;
      }
    }
    
    // Speaking mouth animation
    if (mouthRef.current && isSpeaking) {
      const talkAnimation = Math.sin(state.clock.elapsedTime * 12) * audioLevel;
      mouthRef.current.scale.y = 1 + talkAnimation * 0.4;
      mouthRef.current.scale.x = 1 + talkAnimation * 0.2;
    }
    
    // Professional hand gestures when speaking
    if (leftArmRef.current && rightArmRef.current) {
      if (isSpeaking) {
        leftArmRef.current.rotation.z = 0.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        rightArmRef.current.rotation.z = -0.2 + Math.sin(state.clock.elapsedTime * 2.5) * 0.1;
      } else {
        leftArmRef.current.rotation.z = 0.2;
        rightArmRef.current.rotation.z = -0.2;
      }
    }
  });
  
  return (
    <group position={position} scale={[1.2, 1.2, 1.2]}>
      {/* Enhanced head */}
      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={colors.skin}
          metalness={0.1}
          roughness={0.9}
          emissive={isActive ? 'hsl(var(--primary))' : '#000000'}
          emissiveIntensity={isActive ? 0.05 : 0}
        />
      </mesh>
      
      {/* Professional hair */}
      <mesh ref={hairRef} position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[1.05, 16, 16]} />
        <meshStandardMaterial color={colors.hair} roughness={0.95} />
      </mesh>
      
      {/* Detailed eyes with glasses */}
      <group ref={eyesRef} position={[0, 0.2, 0.85]}>
        {/* Eye whites */}
        <mesh position={[-0.28, 0, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.28, 0, 0]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Iris */}
        <mesh position={[-0.28, 0, 0.12]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
        <mesh position={[0.28, 0, 0.12]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.28, 0, 0.13]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.28, 0, 0.13]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        
        {/* Professional glasses with theme colors */}
        <group position={[0, 0, 0.1]}>
          {/* Left lens frame */}
          <mesh position={[-0.28, 0, 0]}>
            <torusGeometry args={[0.18, 0.025, 8, 16]} />
            <meshStandardMaterial color="hsl(var(--foreground))" metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Right lens frame */}
          <mesh position={[0.28, 0, 0]}>
            <torusGeometry args={[0.18, 0.025, 8, 16]} />
            <meshStandardMaterial color="hsl(var(--foreground))" metalness={0.3} roughness={0.7} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            <meshStandardMaterial color="hsl(var(--foreground))" />
          </mesh>
          {/* Temples */}
          <mesh position={[-0.45, 0, -0.3]} rotation={[0, Math.PI / 6, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8]} />
            <meshStandardMaterial color="hsl(var(--foreground))" />
          </mesh>
          <mesh position={[0.45, 0, -0.3]} rotation={[0, -Math.PI / 6, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8]} />
            <meshStandardMaterial color="hsl(var(--foreground))" />
          </mesh>
        </group>
        
        {/* Eyebrows */}
        <mesh position={[-0.28, 0.18, 0.05]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.35, 0.06, 0.03]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>
        <mesh position={[0.28, 0.18, 0.05]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.35, 0.06, 0.03]} />
          <meshStandardMaterial color={colors.hair} />
        </mesh>
      </group>
      
      {/* Detailed nose */}
      <mesh position={[0, 0, 0.92]}>
        <coneGeometry args={[0.09, 0.25, 8]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      
      {/* Professional mouth */}
      <mesh ref={mouthRef} position={[0, -0.32, 0.82]}>
        <sphereGeometry args={[0.16, 16, 8]} />
        <meshStandardMaterial color="#8B4A4A" />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-1.02, 0.1, 0.15]}>
        <sphereGeometry args={[0.16, 8, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      <mesh position={[1.02, 0.1, 0.15]}>
        <sphereGeometry args={[0.16, 8, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, -1.25, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.42, 0.65]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      
      {/* Professional shirt */}
      <mesh position={[0, -2.1, 0]} castShadow>
        <cylinderGeometry args={[0.85, 1.25, 1.6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Professional suit jacket */}
      <mesh position={[0, -2.1, 0]} castShadow>
        <cylinderGeometry args={[0.9, 1.3, 1.65]} />
        <meshStandardMaterial color={colors.clothes} />
      </mesh>
      
      {/* Professional tie */}
      <mesh position={[0, -1.9, 0.45]}>
        <boxGeometry args={[0.18, 1.0, 0.06]} />
        <meshStandardMaterial color={colors.tie} />
      </mesh>
      
      {/* Detailed arms in professional position */}
      <mesh ref={leftArmRef} position={[-1.25, -2.1, 0]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 1.9]} />
        <meshStandardMaterial color={colors.clothes} />
      </mesh>
      <mesh ref={rightArmRef} position={[1.25, -2.1, 0]} rotation={[0, 0, -0.2]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 1.9]} />
        <meshStandardMaterial color={colors.clothes} />
      </mesh>
      
      {/* Detailed hands in professional position */}
      <mesh position={[-1.65, -2.9, 0.3]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      <mesh position={[1.65, -2.9, 0.3]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={colors.skin} />
      </mesh>
      
      {/* Fingers for left hand */}
      <group position={[-1.65, -2.9, 0.3]}>
        <mesh position={[0.08, 0, 0.12]}>
          <cylinderGeometry args={[0.025, 0.025, 0.15]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>
        <mesh position={[0.12, 0, 0.05]}>
          <cylinderGeometry args={[0.025, 0.025, 0.18]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>
        <mesh position={[0.1, 0, -0.05]}>
          <cylinderGeometry args={[0.025, 0.025, 0.16]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>
        <mesh position={[0.05, 0, -0.12]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>
      </group>
      
      {/* Fingers for right hand */}
      <group position={[1.65, -2.9, 0.3]}>
        <mesh position={[-0.08, 0, 0.12]}>
          <cylinderGeometry args={[0.025, 0.025, 0.15]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>
        <mesh position={[-0.12, 0, 0.05]}>
          <cylinderGeometry args={[0.025, 0.025, 0.18]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>
        <mesh position={[-0.1, 0, -0.05]}>
          <cylinderGeometry args={[0.025, 0.025, 0.16]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>
        <mesh position={[-0.05, 0, -0.12]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12]} />
          <meshStandardMaterial color={colors.skin} />
        </mesh>
      </group>
      
      {/* Collar and suit details */}
      <mesh position={[0, -1.45, 0.35]}>
        <boxGeometry args={[0.9, 0.25, 0.12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Voice visualization when speaking with theme colors */}
      {isSpeaking && (
        <>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.8, 2.1, 16]} />
            <meshBasicMaterial 
              color="hsl(var(--primary))" 
              transparent 
              opacity={0.4 + audioLevel * 0.4}
            />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <ringGeometry args={[2.3, 2.6, 16]} />
            <meshBasicMaterial 
              color="hsl(var(--primary))" 
              transparent 
              opacity={0.3 + audioLevel * 0.3}
            />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
            <ringGeometry args={[2.8, 3.1, 16]} />
            <meshBasicMaterial 
              color="hsl(var(--primary))" 
              transparent 
              opacity={0.2 + audioLevel * 0.2}
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
        camera={{ position: [0, 1, 8], fov: 50 }}
        shadows
      >
        {/* Professional lighting setup */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[12, 15, 8]} 
          intensity={1.2}
          castShadow
          shadow-mapSize={[4096, 4096]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <pointLight position={[-15, 8, 5]} intensity={0.4} color="#f4f4f4" />
        <spotLight 
          position={[0, 20, 10]} 
          angle={0.2}
          intensity={0.8}
          castShadow
          color="#ffffff"
        />
        
        {/* Office environment */}
        <OfficeEnvironment />
        
        {/* Robert in center focus */}
        <DetailedRobertAvatar
          isActive={isActive}
          isSpeaking={isSpeaking}
          audioLevel={audioLevel}
          position={[0, 0, 0]}
        />
        
        {/* Professional environment lighting */}
        <Environment preset="city" />
      </Canvas>
      
      {/* Professional interviewer info with theme colors */}
      <div className="absolute bottom-6 left-6 bg-card/90 backdrop-blur-md rounded-xl p-4 border shadow-lg">
        <div className="flex items-center space-x-4">
          <div className={`w-4 h-4 rounded-full ${
            isActive ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
          }`} />
          <div>
            <p className="font-bold text-lg text-foreground">{name}</p>
            <p className="text-sm text-primary">{role}</p>
            <p className="text-xs text-muted-foreground capitalize">Team Lead</p>
          </div>
        </div>
      </div>
      
      {/* Enhanced speaking indicator with theme colors */}
      {isSpeaking && (
        <div className="absolute top-6 right-6 bg-card/90 backdrop-blur-md rounded-xl p-3 border border-primary/50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-foreground font-medium">Speaking</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary to-primary/60 rounded-full"
                  style={{
                    height: `${20 + Math.random() * audioLevel * 30}px`,
                    animation: `pulse ${0.8 + Math.random() * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterviewer;
