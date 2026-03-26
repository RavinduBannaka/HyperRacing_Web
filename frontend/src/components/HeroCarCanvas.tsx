import { Canvas, useFrame } from '@react-three/fiber'
import React, { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ContactShadows, Environment, OrbitControls, Stage, useGLTF, useProgress } from '@react-three/drei'
import * as THREE from 'three'

const LOCAL_MODEL_URL = '/models/hyper-hypercar.glb'
const REMOTE_MODEL_URL =
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/mercedes-amg-one/model.gltf'

const fallbackStill =
  'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80&sat=-12'

type CarModelProps = {
  autoRotate: boolean
}

class CanvasErrorBoundary extends Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Hero canvas crashed', error)
  }

  componentDidUpdate(prevProps: { children: React.ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      // reset on new children
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

const CarModel = ({ autoRotate }: CarModelProps) => {
  const group = useRef<THREE.Group>(null)
  const [source, setSource] = useState<string>(REMOTE_MODEL_URL)

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    fetch(LOCAL_MODEL_URL, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        if (res.ok && isMounted) {
          setSource(LOCAL_MODEL_URL)
        }
      })
      .catch(() => {
        // keep remote fallback
      })

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const { scene } = useGLTF(source) as unknown as { scene: THREE.Group }

  useEffect(() => {
    scene.traverse((node: THREE.Object3D) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh
        mesh.castShadow = true
        mesh.receiveShadow = true
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial
          material.roughness = Math.max(0.12, material.roughness ?? 0.2)
          material.metalness = Math.min(0.9, material.metalness ?? 0.8)
        }
      }
    })
  }, [scene])

  const baseScale = useMemo(() => 1.4, [])

  useFrame((_state: any, delta: number) => {
    if (autoRotate && group.current) {
      group.current.rotation.y += delta * 0.35
    }
  })

  return <primitive ref={group} object={scene} scale={baseScale} />
}

const LoadingGradient = () => {
  const { progress } = useProgress()
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0b0f1a] via-[#0e0d17] to-[#1b0b12]">
      <div className="h-28 w-28 animate-pulse rounded-full bg-gradient-to-br from-rose-500/40 via-red-500/35 to-orange-400/30 blur-xl" />
      <p className="mt-4 text-sm font-semibold tracking-[0.2em] text-rose-100/80">CALIBRATING • {progress.toFixed(0)}%</p>
    </div>
  )
}

const HeroCarFallback = ({ reason }: { reason: string }) => (
  <div className="relative h-[420px] sm:h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b0f1a] via-[#0e0d17] to-[#1b0b12]">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-80"
      style={{ backgroundImage: `url(${fallbackStill})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />
    <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-100 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-rose-100">Garage preview</p>
        <p className="font-semibold text-white">3D temporarily unavailable</p>
        <p className="text-xs text-slate-300">{reason}</p>
      </div>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs">Static</span>
    </div>
  </div>
)

export const HeroCarCanvas = () => {
  const [isInteracting, setIsInteracting] = useState(false)
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setCanRender(Boolean(gl))
    } catch (error) {
      console.warn('WebGL unavailable', error)
      setCanRender(false)
    }
  }, [])

  if (!canRender) {
    return <HeroCarFallback reason="WebGL is disabled or unsupported on this device." />
  }

  return (
    <div className="relative h-[420px] sm:h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 shadow-neon">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,72,92,0.25),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_35%)]" />

      <CanvasErrorBoundary fallback={<HeroCarFallback reason="Model failed to load. Showing static render." />}>
        <Suspense fallback={<LoadingGradient />}>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [4.2, 2.6, 5.2], fov: 38 }}
            className="relative"
          >
            <color attach="background" args={[`#06060a`]} />

            <Stage
              intensity={1.2}
              environment={undefined}
              adjustCamera={false}
              shadows={false}
              preset="rembrandt"
            >
              <CarModel autoRotate={!isInteracting} />
            </Stage>

            <spotLight
              position={[5, 8, 4]}
              angle={0.6}
              penumbra={0.4}
              intensity={1.4}
              color="#ff4b5c"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <spotLight position={[-6, 6, -2]} angle={0.7} penumbra={0.4} intensity={0.9} color="#7dd5ff" />
            <directionalLight position={[0, 3, 5]} intensity={0.6} color="#ffffff" />

            <Environment preset="city" />

            <ContactShadows
              position={[0, -0.8, 0]}
              opacity={0.5}
              scale={12}
              blur={2.8}
              far={8}
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={(Math.PI / 2) * 1.05}
              autoRotate={false}
              rotateSpeed={0.65}
              onStart={() => setIsInteracting(true)}
              onEnd={() => setIsInteracting(false)}
            />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
    </div>
  )
}

useGLTF.preload(LOCAL_MODEL_URL)
useGLTF.preload(REMOTE_MODEL_URL)
