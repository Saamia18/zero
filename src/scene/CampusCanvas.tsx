import React, { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { CampusGround } from './CampusGround';
import { CampusBuildings } from './CampusBuildings';
import { EquipmentPins } from './EquipmentPins';
import { CameraController } from './CameraController';
import { useCampusStore } from '../store/campusStore';
import { BuildingUsageStats } from '../utils/usageHeatmap';
import type { AppTheme } from '../components/ThemeToggle';
import { scenePalette } from './sceneTheme';

interface CampusCanvasProps {
  heatmapEnabled?: boolean;
  buildingUsage?: Record<string, BuildingUsageStats>;
  usageMax?: number;
  theme?: AppTheme;
}

const SceneThemeBridge: React.FC<{ theme: AppTheme }> = ({ theme }) => {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(scenePalette[theme].clear);
  }, [gl, theme]);

  return null;
};

export const CampusCanvas: React.FC<CampusCanvasProps> = ({ heatmapEnabled = false, buildingUsage = {}, usageMax = 1, theme = 'dark' }) => {
  const clearMapSelection = useCampusStore((s) => s.clearMapSelection);
  const palette = scenePalette[theme];

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing"
    >
      <Canvas
        onPointerMissed={(event) => {
          if (event.type === 'click') clearMapSelection();
        }}
        orthographic
        camera={{
          position: [34, 28, 34],
          zoom: 23,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl, camera }) => {
          gl.setClearColor(palette.clear);
          camera.lookAt(0.8, 0, 0.5);
        }}
      >
        <SceneThemeBridge theme={theme} />
        <ambientLight intensity={theme === 'dark' ? 0.4 : 0.7} color={palette.ambient} />
        <directionalLight position={[30, 50, 30]} intensity={theme === 'dark' ? 0.8 : 1.1} color={palette.directional} />
        <pointLight position={[-10, 15, -10]} intensity={theme === 'dark' ? 1.5 : 0.55} color={palette.accentLight} distance={40} />
        <pointLight position={[10, 15, 10]} intensity={theme === 'dark' ? 1.2 : 0.7} color={palette.warmLight} distance={40} />

        <CampusGround theme={theme} />
        <CampusBuildings heatmapEnabled={heatmapEnabled} buildingUsage={buildingUsage} usageMax={usageMax} theme={theme} />
        <EquipmentPins theme={theme} />
        <CameraController />

        {theme === 'dark' && <EffectComposer enableNormalPass={false} multisampling={4}>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.85}
            intensity={palette.bloomIntensity}
            mipmapBlur
          />
        </EffectComposer>}
      </Canvas>
    </div>
  );
};
