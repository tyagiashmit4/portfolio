import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "../../context/ThemeContext";
import * as THREE from "three";

export const Hero3D = () => {
    const meshRef = useRef<any>(null);
    const materialRef = useRef<any>(null);
    const { colors } = useTheme();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, state.mouse.y * 0.4, 0.05);
            meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, state.mouse.x * 0.4, 0.05);
        }
        if (materialRef.current) {
            // Distance of mouse from the center of screen (0 to ~1.4)
            const mouseDistance = Math.hypot(state.mouse.x, state.mouse.y);
            
            // Warp distortion and speed based on mouse movement/distance
            const targetDistort = 0.35 + Math.min(mouseDistance * 0.35, 0.45);
            const targetSpeed = 1.5 + Math.min(mouseDistance * 2.5, 3.5);

            materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.08);
            materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, targetSpeed, 0.08);
        }
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 100, 200]} scale={0.6}>
                <MeshDistortMaterial
                    ref={materialRef}
                    color={colors.accent}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    metalness={0.8}
                    roughness={0.2}
                />
            </Sphere>
        </Float>
    );
};
