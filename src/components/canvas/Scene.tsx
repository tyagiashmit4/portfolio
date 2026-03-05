import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm'
import { useTheme } from '../../context/ThemeContext'

function ParticleBackground() {
  const ref = useRef<any>(null)
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 })
  const { colors } = useTheme()

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={colors.primary}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>

    </group>
  )
}

export const Scene = ({ children, cameraPos = [0, 0, 1] }: { children?: React.ReactNode, cameraPos?: [number, number, number] }) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: cameraPos }}>
        <ParticleBackground />
        {children}
      </Canvas>
    </div>
  )
}
