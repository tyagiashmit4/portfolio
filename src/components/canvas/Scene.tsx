import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm'
import { useTheme } from '../../context/ThemeContext'

function ParticleBackground() {
  const ref = useRef<any>(null)
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 })
  const { colors } = useTheme()
  const scrollRef = useRef({ lastY: 0, velocity: 0 })

  useEffect(() => {
    let lastTime = performance.now()
    const handleScroll = () => {
      const currentY = window.scrollY
      const currentTime = performance.now()
      const deltaY = currentY - scrollRef.current.lastY
      const deltaTime = Math.max(1, currentTime - lastTime)
      
      scrollRef.current.velocity = deltaY / deltaTime
      scrollRef.current.lastY = currentY
      lastTime = currentTime
    };
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      // Calculate speed factor based on scroll velocity (scaled for effect)
      let speedFactor = 1.0 + Math.abs(scrollRef.current.velocity) * 8.0
      
      // Decay velocity slightly over time in the frame loop
      scrollRef.current.velocity *= 0.95

      ref.current.rotation.x -= (delta / 12) * speedFactor
      ref.current.rotation.y -= (delta / 18) * speedFactor
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
