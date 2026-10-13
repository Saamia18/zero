import { Building } from '../data/mock';
import type { AppTheme } from '../components/ThemeToggle';

export type CampusSceneTheme = AppTheme;

export const scenePalette = {
  dark: {
    clear: '#050B14',
    ground: '#050B14',
    grid: '#00e5ff',
    path: '#00f0ff',
    courtyard: '#00e5ff',
    ambient: '#cceeff',
    directional: '#ffffff',
    accentLight: '#00e5ff',
    warmLight: '#f97316',
    bloomIntensity: 1.2,
    gridOpacity: 0.07,
    pathOpacity: 0.65,
    courtyardOpacity: 0.04,
    additive: true,
    htmlPanel: 'border-cyan-400/30 bg-slate-950/90 text-slate-200 shadow-neon-cyan',
    htmlMuted: 'text-slate-400',
    meterTrack: 'bg-slate-800',
    label: 'border-cyan-400/30 bg-slate-950/82 text-slate-100',
    pin: {
      defaultBorder: '#00f0ff',
      defaultBg: 'rgba(6, 25, 45, 0.9)',
      defaultGlow: 'rgba(0, 240, 255, 0.5)',
      selected: '#ffffff',
      iconBg: 'rgba(0, 0, 0, 0.4)',
    },
  },
  light: {
    clear: '#f3eadb',
    ground: '#fbf3e6',
    grid: '#8c765f',
    path: '#9b6938',
    courtyard: '#b8844d',
    ambient: '#fff4df',
    directional: '#fffaf0',
    accentLight: '#b8844d',
    warmLight: '#d59b62',
    bloomIntensity: 0.08,
    gridOpacity: 0.34,
    pathOpacity: 0.5,
    courtyardOpacity: 0.11,
    additive: false,
    htmlPanel: 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-glass',
    htmlMuted: 'text-[var(--muted)]',
    meterTrack: 'bg-[var(--surface-muted)]',
    label: 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)]',
    pin: {
      defaultBorder: '#8a5428',
      defaultBg: 'rgba(255, 248, 234, 0.94)',
      defaultGlow: 'rgba(138, 84, 40, 0.28)',
      selected: '#5a3218',
      iconBg: 'rgba(116, 82, 45, 0.12)',
    },
  },
} as const;

export const buildingAccentColor = (building: Building, theme: CampusSceneTheme) => {
  if (theme === 'dark') return building.neonColor;
  switch (building.id) {
    case 'bldg-science':
      return '#8f623d';
    case 'bldg-media-1':
      return '#7c5436';
    case 'bldg-library':
      return '#8f4f34';
    case 'bldg-media-2':
      return '#8a6a3e';
    case 'bldg-media-3':
      return '#775541';
    case 'bldg-empty-blue':
      return '#705746';
    case 'bldg-empty-orange':
      return '#8b4c32';
    default:
      return '#7b5639';
  }
};

export const buildingRoofColor = (building: Building, theme: CampusSceneTheme) => {
  if (theme === 'dark') return '#070c14';
  switch (building.id) {
    case 'bldg-science':
      return '#8a6747';
    case 'bldg-media-1':
      return '#775436';
    case 'bldg-library':
      return '#844830';
    case 'bldg-media-2':
      return '#8f7047';
    case 'bldg-media-3':
      return '#735543';
    case 'bldg-empty-blue':
      return '#6f5b4c';
    case 'bldg-empty-orange':
      return '#77422f';
    default:
      return '#7d5f45';
  }
};

export const buildingSecondaryColor = (building: Building, theme: CampusSceneTheme) => {
  if (theme === 'dark') return '#1e293b';
  switch (building.id) {
    case 'bldg-science':
      return '#b98956';
    case 'bldg-media-1':
      return '#a9784c';
    case 'bldg-library':
      return '#a95f3f';
    case 'bldg-media-2':
      return '#b89058';
    case 'bldg-media-3':
      return '#976f56';
    case 'bldg-empty-blue':
      return '#907967';
    case 'bldg-empty-orange':
      return '#93543a';
    default:
      return '#a17956';
  }
};

export const buildingWallColor = (building: Building, theme: CampusSceneTheme, state: 'idle' | 'active' | 'dimmed') => {
  if (theme === 'dark') {
    if (state === 'dimmed') return '#101827';
    if (state === 'active') {
      switch (building.colorTheme) {
        case 'cyan':
          return '#17334a';
        case 'green':
          return '#173827';
        case 'orange':
          return '#442515';
        case 'dark-blue':
        default:
          return '#1c2b4d';
      }
    }
    switch (building.colorTheme) {
      case 'cyan':
        return '#10283d';
      case 'green':
        return '#102b20';
      case 'orange':
        return '#2d190f';
      case 'dark-blue':
      default:
        return '#121f35';
    }
  }

  if (state === 'dimmed') return '#d5c4ae';
  if (state === 'active') {
    switch (building.id) {
      case 'bldg-science':
        return '#d2a36d';
      case 'bldg-media-1':
        return '#bd8b5a';
      case 'bldg-library':
        return '#c97852';
      case 'bldg-media-2':
        return '#d0aa6f';
      case 'bldg-media-3':
        return '#ac8163';
      case 'bldg-empty-blue':
        return '#9d846d';
      case 'bldg-empty-orange':
        return '#ad6444';
      default:
        return '#c19462';
    }
  }
  switch (building.id) {
    case 'bldg-science':
      return '#c79561';
    case 'bldg-media-1':
      return '#ae7a4e';
    case 'bldg-library':
      return '#b96b45';
    case 'bldg-media-2':
      return '#c49d64';
    case 'bldg-media-3':
      return '#9d745a';
    case 'bldg-empty-blue':
      return '#8f7763';
    case 'bldg-empty-orange':
      return '#9f5a3d';
    default:
      return '#b98658';
  }
};

export const windowColor = (theme: CampusSceneTheme, lit: boolean) => (theme === 'dark' ? (lit ? '#1e3a5f' : '#0a101d') : lit ? '#fff0cf' : '#8f735a');
export const windowGlowColor = (building: Building, theme: CampusSceneTheme, isMatch: boolean) => (theme === 'dark' ? (isMatch ? buildingAccentColor(building, theme) : '#0369a1') : buildingAccentColor(building, theme));
export const darkMaterial = (theme: CampusSceneTheme, fallback = '#1e293b') => (theme === 'dark' ? fallback : '#8d735d');
export const roofMaterial = (theme: CampusSceneTheme, fallback = '#070c14') => (theme === 'dark' ? fallback : '#7d6148');
export const plinthMaterial = (theme: CampusSceneTheme, fallback = '#080e18') => (theme === 'dark' ? fallback : '#9c8265');
