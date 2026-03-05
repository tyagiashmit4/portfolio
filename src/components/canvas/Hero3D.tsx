import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";

export const Hero3D = () => {
    const meshRef = useRef<any>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.mouse.y * 0.2;
            meshRef.current.rotation.y = state.mouse.x * 0.2;
        }
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 100, 200]} scale={0.6}>
                <MeshDistortMaterial
                    color="#7B61FF"
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
