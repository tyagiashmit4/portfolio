import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'

// Full list of user's skills
const technologies = [
  "React Native", "React.js", "JavaScript", "TypeScript", 
  "Node.js", "Java", "Spring Boot", "MySql", 
  "HTML", "CSS", "DSA", "OOPs", "Git", "Github",
  "MongoDB", "Redux",
]

function TechIcon({ name, index, total }: { name: string, index: number, total: number }) {
  const ref = useRef<THREE.Group>(null)
  const { colors } = useTheme()
  
  const phi = Math.acos(-1 + (2 * index) / total)
  const theta = Math.sqrt(total * Math.PI) * phi
  
  const radius = 3.0 // Slightly larger radius for more skills

  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime() * 0.15
      ref.current.position.x = x * Math.cos(time) - z * Math.sin(time)
      ref.current.position.z = x * Math.sin(time) + z * Math.cos(time)
      ref.current.position.y = y + Math.sin(time + index) * 0.1
      ref.current.quaternion.copy(state.camera.quaternion)
    }
  })

  return (
    <group ref={ref}>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <Text
          fontSize={0.18}
          color={colors.primary}
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </Float>
    </group>
  )
}

export function OrbitingTech() {
  const { colors } = useTheme()
  return (
    <group>
      <Sphere args={[1.2, 64, 64]}>
        <MeshDistortMaterial
          color={colors.secondary}
          transparent
          opacity={0.4}
          distort={0.4}
          speed={1.5}
          metalness={1}
          roughness={0}
        />
      </Sphere>
      <pointLight position={[0, 0, 0]} intensity={3} color={colors.primary} />
      {technologies.map((tech, i) => (
        <TechIcon key={tech} name={tech} index={i} total={technologies.length} />
      ))}
    </group>
  )
}
