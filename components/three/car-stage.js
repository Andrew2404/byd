'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const DOOR_INTERACTION_PRESETS = [
  {
    key: 'frontLeft',
    direction: 1,
    openAngle: Math.PI / 3.5,
    doorHints: ['front_left_door', 'door_front_left', 'left_front_door', 'driver_door', 'door_lf', 'door_fl'],
    handleHints: ['front_left_handle', 'door_handle_front_left', 'driver_handle', 'handle_lf', 'handle_fl'],
  },
  {
    key: 'frontRight',
    direction: -1,
    openAngle: Math.PI / 3.5,
    doorHints: ['front_right_door', 'door_front_right', 'right_front_door', 'passenger_door', 'door_rf', 'door_fr'],
    handleHints: ['front_right_handle', 'door_handle_front_right', 'passenger_handle', 'handle_rf', 'handle_fr'],
  },
];

const VIEW_PRESETS = {
  exterior: {
    position: [5, 2, 5],
    target: [0, 1.1, 0],
    fov: 35,
    minDistance: 3,
    maxDistance: 10,
    minPolarAngle: 0.55,
    maxPolarAngle: Math.PI / 2.1,
    enablePan: true,
    enableZoom: true,
    rotateSpeed: 0.3,
    zoomSpeed: 0.45,
    panSpeed: 0.4,
    dampingFactor: 0.16,
  },
  interior: {
    position: [-0.28, 1.20, -0.18],
    target: [-0.14, 1.01, -2.95],
    fov: 82,
    pitchLimit: Math.PI / 2.1,
    dragSensitivity: 0.004,
    damping: 10,
  },
};

const INTERIOR_COLOR_MAP = {
  obsidian: '#1f2937',
  pearl: '#f1f5f9',
};

const WHEEL_CONFIG_MAP = {
  'aero-19': { scale: 1, offsetY: 0 },
  'performance-20': { scale: 1.025, offsetY: 0.035 },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeNodeName(value) {
  return `${value || ''}`.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

function matchesInteractionHints(object, hints) {
  const names = [object.name, object.parent?.name]
    .filter(Boolean)
    .map((value) => normalizeNodeName(value));

  return hints.some((hint) => names.some((name) => name.includes(hint)));
}

function buildDoorInteractions(model) {
  const interactions = [];

  DOOR_INTERACTION_PRESETS.forEach((preset) => {
    let doorNode = null;
    let handleNode = null;

    model.traverse((child) => {
      if (!doorNode && matchesInteractionHints(child, preset.doorHints)) {
        doorNode = child;
      }

      if (!handleNode && matchesInteractionHints(child, preset.handleHints)) {
        handleNode = child;
      }
    });

    if (!doorNode || !handleNode) return;

    interactions.push({
      ...preset,
      clickTargetUuid: handleNode.uuid,
      closedRotationY: doorNode.rotation.y,
      node: doorNode,
    });
  });

  return interactions;
}


function getLookAngles(position, target) {
  const direction = new THREE.Vector3().subVectors(new THREE.Vector3(...target), new THREE.Vector3(...position)).normalize();

  return {
    yaw: Math.atan2(direction.x, -direction.z),
    pitch: Math.asin(direction.y),
  };
}

function isInteriorMaterial(material) {
  if (!material || material.transparent || material.opacity < 0.95) return false;

  const materialName = `${material.name || ''}`.toLowerCase();
  const interiorHints = ['interior', 'seat', 'headrest', 'dashboard', 'dash', 'cabin', 'console', 'upholstery', 'trim'];
  const blockedHints = ['glass', 'window', 'screen', 'chrome', 'rim', 'wheel', 'tyre', 'tire', 'rubber', 'light', 'lamp', 'body', 'paint', 'hood', 'door', 'fender', 'bumper'];

  if (blockedHints.some((hint) => materialName.includes(hint))) return false;
  if (interiorHints.some((hint) => materialName.includes(hint))) return true;
  if (!material.color) return false;

  const hsl = { h: 0, s: 0, l: 0 };
  material.color.getHSL(hsl);

  return hsl.s < 0.45 && hsl.l > 0.08 && hsl.l < 0.82 && material.metalness < 0.45;
}

function shouldTintExteriorMaterial(material) {
  if (!material || material.transparent || material.opacity < 0.95) return false;

  const materialName = `${material.name || ''}`.toLowerCase();
  const tintableNameHints = ['body', 'paint', 'carpaint', 'exterior', 'shell', 'door', 'hood', 'fender', 'bumper'];
  const nonTintableNameHints = ['glass', 'window', 'screen', 'chrome', 'rim', 'wheel', 'tyre', 'tire', 'rubber', 'plastic', 'trim', 'light', 'lamp', 'interior', 'seat', 'dashboard', 'dash', 'console', 'upholstery'];

  if (nonTintableNameHints.some((hint) => materialName.includes(hint))) return false;
  if (tintableNameHints.some((hint) => materialName.includes(hint))) return true;
  if (!material.color) return false;

  const hsl = { h: 0, s: 0, l: 0 };
  material.color.getHSL(hsl);

  return hsl.s > 0.2 && hsl.l > 0.12 && hsl.l < 0.82 && material.metalness > 0.05;
}

function tintExteriorMaterial(material, color) {
  if (!shouldTintExteriorMaterial(material)) return;

  if (!material.userData.baseColor) {
    material.userData.baseColor = material.color.clone();
  }

  const baseHsl = { h: 0, s: 0, l: 0 };
  const nextHsl = { h: 0, s: 0, l: 0 };
  material.userData.baseColor.getHSL(baseHsl);
  color.getHSL(nextHsl);

  material.color.setHSL(nextHsl.h, Math.max(nextHsl.s, 0.35), THREE.MathUtils.clamp((baseHsl.l + nextHsl.l) / 2, 0.12, 0.72));
  material.needsUpdate = true;
}

function tintInteriorMaterial(material, color) {
  if (!isInteriorMaterial(material)) return;

  if (!material.userData.baseColor) {
    material.userData.baseColor = material.color.clone();
  }

  const baseHsl = { h: 0, s: 0, l: 0 };
  const nextHsl = { h: 0, s: 0, l: 0 };
  material.userData.baseColor.getHSL(baseHsl);
  color.getHSL(nextHsl);

  material.color.setHSL(nextHsl.h, THREE.MathUtils.clamp(nextHsl.s * 0.35, 0, 0.2), THREE.MathUtils.clamp((baseHsl.l * 0.55) + (nextHsl.l * 0.45), 0.12, 0.88));
  material.needsUpdate = true;
}

function applyExteriorColor(model, exteriorColor) {
  const nextColor = new THREE.Color(exteriorColor);

  model.traverse((child) => {
    if (!child.isMesh || !child.material) return;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => tintExteriorMaterial(material, nextColor));
  });
}

function applyInteriorColor(model, interiorColorKey) {
  const nextColor = new THREE.Color(INTERIOR_COLOR_MAP[interiorColorKey] || INTERIOR_COLOR_MAP.obsidian);

  model.traverse((child) => {
    if (!child.isMesh || !child.material) return;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => tintInteriorMaterial(material, nextColor));
  });
}

function isWheelNode(node) {
  const nodeName = `${node.name || ''}`.toLowerCase();
  const materialName = Array.isArray(node.material)
    ? node.material.map((material) => `${material?.name || ''}`.toLowerCase()).join(' ')
    : `${node.material?.name || ''}`.toLowerCase();
  const haystack = `${nodeName} ${materialName}`;

  return haystack.includes('d_tire') || haystack.includes(' tire') || haystack.includes('tyre');
}

function applyWheelScale(model, wheelKey) {
  const wheelConfig = WHEEL_CONFIG_MAP[wheelKey] || WHEEL_CONFIG_MAP['aero-19'];
  const nextScale = wheelConfig.scale;

  model.traverse((child) => {
    if (!child.isMesh || !child.geometry || !isWheelNode(child)) return;

    const positionAttribute = child.geometry.attributes.position;
    if (!positionAttribute) return;

    if (!child.userData.baseWheelPositions) {
      child.userData.baseWheelPositions = Float32Array.from(positionAttribute.array);
      child.geometry.computeBoundingBox();
      child.userData.baseWheelCenter = child.geometry.boundingBox.getCenter(new THREE.Vector3()).toArray();
    }

    const [centerX, centerY, centerZ] = child.userData.baseWheelCenter;
    const basePositions = child.userData.baseWheelPositions;

    for (let index = 0; index < positionAttribute.array.length; index += 3) {
      positionAttribute.array[index] = centerX + ((basePositions[index] - centerX) * nextScale);
      positionAttribute.array[index + 1] = centerY + ((basePositions[index + 1] - centerY) * nextScale) + wheelConfig.offsetY;
      positionAttribute.array[index + 2] = centerZ + ((basePositions[index + 2] - centerZ) * nextScale);
    }

    positionAttribute.needsUpdate = true;
    child.geometry.computeBoundingBox();
    child.geometry.computeBoundingSphere();
  });
}

function VehicleModel({ glbPath, viewMode, exteriorColor, interiorColorKey, wheelKey }) {
  const { scene } = useGLTF(glbPath);
  const groupRef = useRef(null);
  const doorInteractionsRef = useRef([]);
  const [doorStates, setDoorStates] = useState({});
  const model = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    model.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = true;
      child.receiveShadow = true;
    });

    group.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const fittedScale = 4.5 / maxAxis;

    model.scale.setScalar(fittedScale);
    model.position.set(-center.x * fittedScale, -box.min.y * fittedScale, -center.z * fittedScale);
  }, [model]);

  useEffect(() => {
    applyExteriorColor(model, exteriorColor);
  }, [exteriorColor, model]);

  useEffect(() => {
    applyInteriorColor(model, interiorColorKey);
  }, [interiorColorKey, model]);

  useEffect(() => {
    applyWheelScale(model, wheelKey);
  }, [model, wheelKey]);

  useEffect(() => {
    doorInteractionsRef.current = buildDoorInteractions(model);
    setDoorStates({});
  }, [model]);

  useFrame((_, delta) => {
    doorInteractionsRef.current.forEach((interaction) => {
      const targetRotationY = viewMode === 'exterior' && doorStates[interaction.key]
        ? interaction.closedRotationY + (interaction.direction * interaction.openAngle)
        : interaction.closedRotationY;

      interaction.node.rotation.y = THREE.MathUtils.damp(interaction.node.rotation.y, targetRotationY, 6, delta);
    });
  });

  const handleDoorToggle = (event) => {
    if (viewMode !== 'exterior') return;

    const interaction = doorInteractionsRef.current.find((item) => item.clickTargetUuid === event.object.uuid);
    if (!interaction) return;

    event.stopPropagation();
    setDoorStates((currentState) => ({
      ...currentState,
      [interaction.key]: !currentState[interaction.key],
    }));
  };

  return (
    <group ref={groupRef} rotation={[0, viewMode === 'interior' ? Math.PI : Math.PI / 3, 0]} onClick={handleDoorToggle}>
      <primitive object={model} />
    </group>
  );
}

function CameraRig({ viewMode, controlsRef }) {
  const { camera } = useThree();

  useEffect(() => {
    const preset = VIEW_PRESETS[viewMode] || VIEW_PRESETS.exterior;

    camera.position.set(...preset.position);
    camera.fov = preset.fov;
    camera.near = viewMode === 'interior' ? 0.01 : 0.1;
    camera.far = 100;
    camera.updateProjectionMatrix();

    if (viewMode === 'exterior' && controlsRef.current) {
      controlsRef.current.target.set(...preset.target);
      controlsRef.current.update();
    }
  }, [camera, controlsRef, viewMode]);

  return null;
}

function InteriorLookRig({ lookStateRef, preset }) {
  const { camera } = useThree();
  const baseAngles = useMemo(() => getLookAngles(preset.position, preset.target), [preset]);
  const lookDirection = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const rotation = useMemo(() => new THREE.Euler(0, 0, 0, 'YXZ'), []);

  useEffect(() => {
    const lookState = lookStateRef.current;

    lookState.yaw = 0;
    lookState.pitch = 0;
    lookState.targetYaw = 0;
    lookState.targetPitch = 0;
  }, [lookStateRef, preset]);

  useFrame((_, delta) => {
    const lookState = lookStateRef.current;

    lookState.yaw = THREE.MathUtils.damp(lookState.yaw, lookState.targetYaw, preset.damping, delta);
    lookState.pitch = THREE.MathUtils.damp(lookState.pitch, lookState.targetPitch, preset.damping, delta);

    camera.position.set(...preset.position);
    rotation.set(baseAngles.pitch + lookState.pitch, baseAngles.yaw + lookState.yaw, 0);
    lookDirection.set(0, 0, -1).applyEuler(rotation);
    lookTarget.copy(camera.position).add(lookDirection.multiplyScalar(5));
    camera.lookAt(lookTarget);
  });

  return null;
}

function Loader() {
  return (
    <Html center>
      <div className="rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white">Loading 3D</div>
    </Html>
  );
}

export function CarStage({ vehicle, viewMode, exteriorColor, interiorColorKey, wheelKey }) {
  const controlsRef = useRef(null);
  const preset = VIEW_PRESETS[viewMode] || VIEW_PRESETS.exterior;
  const interiorLookRef = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
    yaw: 0,
    pitch: 0,
    targetYaw: 0,
    targetPitch: 0,
  });

  const handleInteriorPointerDown = (event) => {
    if (viewMode !== 'interior') return;

    interiorLookRef.current.dragging = true;
    interiorLookRef.current.lastX = event.clientX;
    interiorLookRef.current.lastY = event.clientY;
  };

  const handleInteriorPointerMove = (event) => {
    if (viewMode !== 'interior' || !interiorLookRef.current.dragging) return;

    const deltaX = event.clientX - interiorLookRef.current.lastX;
    const deltaY = event.clientY - interiorLookRef.current.lastY;

    interiorLookRef.current.lastX = event.clientX;
    interiorLookRef.current.lastY = event.clientY;
    interiorLookRef.current.targetYaw += deltaX * preset.dragSensitivity;
    interiorLookRef.current.targetPitch = clamp(
      interiorLookRef.current.targetPitch + deltaY * preset.dragSensitivity,
      -preset.pitchLimit,
      preset.pitchLimit,
    );
  };

  const handleInteriorPointerUp = () => {
    interiorLookRef.current.dragging = false;
  };

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 shadow-glow">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 text-sm text-white/80">
        <div className="flex gap-3">
          <span className="rounded-full border border-white/10 px-3 py-1">{vehicle.name} 3D</span>
          <span className="rounded-full border border-white/10 px-3 py-1">{viewMode === 'interior' ? 'Interior' : 'Exterior'}</span>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">GLB asset</span>
      </div>
      <div
        className={`h-[560px] w-full lg:h-[640px] xl:h-[720px] ${viewMode === 'interior' ? 'cursor-grab active:cursor-grabbing' : ''}`}
        onMouseDown={handleInteriorPointerDown}
        onMouseMove={handleInteriorPointerMove}
        onMouseUp={handleInteriorPointerUp}
        onMouseLeave={handleInteriorPointerUp}
      >
        <Canvas camera={{ position: [5, 2, 5], fov: 35 }} shadows>
          <CameraRig viewMode={viewMode} controlsRef={controlsRef} />
          {viewMode === 'interior' ? <InteriorLookRig lookStateRef={interiorLookRef} preset={preset} /> : null}
          <ambientLight intensity={1.2} />
          <directionalLight position={[6, 8, 6]} intensity={1.6} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <directionalLight position={[-4, 3, -3]} intensity={0.45} />
          <Suspense fallback={<Loader />}>
            <VehicleModel glbPath={vehicle.asset3d.glb} viewMode={viewMode} exteriorColor={exteriorColor} interiorColorKey={interiorColorKey} wheelKey={wheelKey} />
            <Environment preset="city" />
          </Suspense>
          {viewMode === 'exterior' ? (
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]} receiveShadow>
              <planeGeometry args={[30, 30]} />
              <shadowMaterial opacity={0.3} />
            </mesh>
          ) : null}
          {viewMode === 'exterior' ? (
            <OrbitControls
              ref={controlsRef}
              enablePan={preset.enablePan}
              enableZoom={preset.enableZoom}
              minDistance={preset.minDistance}
              maxDistance={preset.maxDistance}
              minPolarAngle={preset.minPolarAngle}
              maxPolarAngle={preset.maxPolarAngle}
              target={preset.target}
              enableDamping
              dampingFactor={preset.dampingFactor}
              rotateSpeed={preset.rotateSpeed}
              zoomSpeed={preset.zoomSpeed}
              panSpeed={preset.panSpeed}
            />
          ) : null}
        </Canvas>
      </div>
    </div>
  );
}
