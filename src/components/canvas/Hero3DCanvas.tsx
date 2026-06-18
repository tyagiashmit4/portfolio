import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Hexagon({ x, y, delay, speed, baseHeight, color }: { x: number; y: number; delay: number; speed: number; baseHeight: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ref.current) {
      // occasional step-popup animation using a thresholded wave
      const raw = Math.sin(time * 0.35 * speed + delay);
      const targetZ = raw > 0.15 ? Math.pow((raw - 0.15) / 0.85, 3.0) * 0.75 : 0;
      
      // Calculate target depth adding the randomized baseHeight offset
      const currentTargetZ = baseHeight + targetZ;
      
      // Smooth interpolation for fluid pop-up and settle transitions
      ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, currentTargetZ, 0.08);
      
      // Extrude depth along cylinder's height (which is local Y axis due to the Math.PI/2 rotation)
      ref.current.scale.y = 1 + ref.current.position.z * 2.2;
      
      // Keep local X and Z scale locked at 1.0 to ensure they never expand in width
      ref.current.scale.x = 1.0;
      ref.current.scale.z = 1.0;
    }
  });

  return (
    // Set rotation Y to 0 so that they align pointed-topped, locking their flat walls together
    <mesh ref={ref} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {/* Set top and bottom radius to 0.5 exactly for no bevel/gaps */}
      <cylinderGeometry args={[0.5, 0.5, 1.0, 6]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.7} // Clay/stone matte roughness
        metalness={0.05}
        clearcoat={0.1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

function HexGrid() {
  // Slate-grey tones to match the portfolio light theme palette
  const hexColors = ["#F8FAFC", "#F1F5F9", "#E2E8F0", "#F8FAFC", "#F1F5F9"];
  
  // Grid parameters configured for mathematically tight hexagonal packing with zero gaps
  const cols = 32;
  const rows = 22;
  const spacingX = 0.866; // sqrt(3) * R spacing where R = 0.5
  const spacingY = 0.75; // 1.5 * R spacing where R = 0.5

  const hexes = useMemo(() => {
    const items = [];
    const originX = ((cols - 1) * spacingX) / 2;
    const originY = ((rows - 1) * spacingY) / 2;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Offset alternate rows horizontally to form the hexagonal grid structure
        const isOffset = r % 2 !== 0;
        const x = c * spacingX + (isOffset ? spacingX / 2 : 0) - originX;
        const y = r * spacingY - originY;

        // Random delay, speed, and base height multipliers for individual popup timings
        const delay = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 0.6; // speed variations
        const baseHeight = Math.random() * 0.45; // Varying starting heights between 0 and 0.45
        
        // Distribution of neutral colors
        const color = hexColors[(c + r + 100) % hexColors.length];

        items.push({ id: `${c}-${r}`, x, y, delay, speed, baseHeight, color });
      }
    }
    return items;
  }, []);

  return (
    // Flat front-facing view, positioned at z = -3.5 to cover background
    <group rotation={[0, 0, 0]} position={[0, 0, -3.5]}>
      {/* Front lights to emphasize flat faces and cast shadows on extruded side walls */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[12, 18, 15]} intensity={2.6} color="#FFFFFF" />
      <directionalLight position={[-12, -18, 5]} intensity={0.4} color="#CBD5E1" />

      {/* Point lights placed in the crevices for back-lit seams */}
      <pointLight position={[0, 0, -0.3]} intensity={6.5} color="#818CF8" distance={10} decay={1.1} />
      <pointLight position={[-6, 4, -0.3]} intensity={5.0} color="#34D399" distance={10} decay={1.1} />
      <pointLight position={[6, -4, -0.3]} intensity={5.0} color="#818CF8" distance={10} decay={1.1} />
      <pointLight position={[-3, -5, -0.3]} intensity={4.5} color="#A78BFA" distance={10} decay={1.1} />
      <pointLight position={[3, 5, -0.3]} intensity={4.5} color="#34D399" distance={10} decay={1.1} />

      {/* Glowing background plane seeping color through cracks */}
      <mesh position={[0, 0, -0.6]}>
        <planeGeometry args={[45, 30]} />
        <meshBasicMaterial color="#EEF2FF" />
      </mesh>

      {hexes.map((hex) => (
        <Hexagon 
          key={hex.id} 
          x={hex.x} 
          y={hex.y} 
          delay={hex.delay} 
          speed={hex.speed} 
          baseHeight={hex.baseHeight} 
          color={hex.color} 
        />
      ))}
    </group>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6.0], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: 'none' }}
      >
        <HexGrid />
      </Canvas>
    </div>
  );
}
