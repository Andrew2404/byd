'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { Suspense, useMemo, useState } from 'react';
import * as THREE from 'three';

function PlaceholderVehicle({ color, showInterior, wheels, doorsOpen }) {
  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color, metalness: 0.85, roughness: 0.2 }), [color]);
  const glassMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#9bdcff', transparent: true, opacity: 0.25 }), []);
  const interiorMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: showInterior ? '#f8fafc' : '#111827', roughness: 0.8 }), [showInterior]);
  const wheelScale = wheels === 'performance-20' ? 1.12 : 1;

  return (
    <group rotation={[0, Math.PI / 3, 0]}>
      <mesh position={[0, 0.55, 0]} material={bodyMaterial} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.8, 1.8]} />
      </mesh>
      <mesh position={[0.1, 1.05, 0]} material={bodyMaterial} castShadow>
        <boxGeometry args={[2.2, 0.6, 1.5]} />
      </mesh>
      <mesh position={[0.25, 1.05, 0]} material={glassMaterial}>
        <boxGeometry args={[1.9, 0.4, 1.45]} />
      </mesh>
      <mesh position={[0, 0.6, 0]} material={interiorMaterial}>
        <boxGeometry args={[3.1, 0.5, 1.4]} />
      </mesh>
      {[-1.2, 1.2].map((x, index) => (
        <group key={x} position={[x, doorsOpen ? 0.72 : 0.68, index === 0 ? -1.02 : 1.02]} rotation={[0, 0, doorsOpen ? (index === 0 ? -0.75 : 0.75) : 0]}>
          <mesh material={bodyMaterial}>
            <boxGeometry args={[1.2, 0.56, 0.08]} />
          </mesh>
        </group>
      ))}
      {[
        [-1.35, 0.15, -0.95],
        [1.35, 0.15, -0.95],
        [-1.35, 0.15, 0.95],
        [1.35, 0.15, 0.95],
      ].map((position, idx) => (
        <mesh key={idx} position={position} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.34 * wheelScale, 0.34 * wheelScale, 0.34, 28]} />
          <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white">Loading 3D</div>
    </Html>
  );
}

export function CarStage({ vehicle, color, showInterior, wheels, viewMode, hotspots = [] }) {
  const [doorsOpen, setDoorsOpen] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 shadow-glow">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 text-sm text-white/80">
          <div className="flex gap-3">
            <span className="rounded-full border border-white/10 px-3 py-1">{vehicle.name} 3D</span>
            <span className="rounded-full border border-white/10 px-3 py-1">{viewMode === 'interior' ? 'Interior' : 'Exterior'}</span>
          </div>
          <button type="button" onClick={() => setDoorsOpen((current) => !current)} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] transition hover:border-electric hover:text-electric">
            {doorsOpen ? 'Close doors' : 'Open doors'}
          </button>
        </div>
        <div className="h-[480px] w-full">
          <Canvas camera={{ position: [5, 2, 5], fov: 35 }} shadows>
            <ambientLight intensity={1.4} />
            <directionalLight position={[6, 6, 6]} intensity={1.5} castShadow />
            <Suspense fallback={<Loader />}>
              <PlaceholderVehicle color={color} showInterior={showInterior} wheels={wheels} doorsOpen={doorsOpen} />
              <Environment preset="city" />
            </Suspense>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
              <planeGeometry args={[30, 30]} />
              <shadowMaterial opacity={0.3} />
            </mesh>
            <OrbitControls enablePan enableZoom maxPolarAngle={Math.PI / 2.1} />
          </Canvas>
        </div>
      </div>
      <div className="premium-card space-y-6">
        <div>
          <p className="section-kicker">Configurator controls</p>
          <h3 className="text-2xl font-semibold">Premium viewing experience</h3>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">This placeholder viewer uses scalable state architecture for official GLB assets, articulated parts, trim logic, and price-impact mapping later.</p>
        </div>
        <div className="space-y-4">
          {hotspots.map((hotspot) => (
            <div key={hotspot.id} className="rounded-2xl border border-slate-200/70 px-4 py-3 text-sm dark:border-white/10">
              <p className="font-semibold">{hotspot.label}</p>
              <p className="mt-1 text-slate-500 dark:text-slate-400">3D hotspot architecture is ready for real model annotations.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
