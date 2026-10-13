import React from 'react';
import { Html } from '@react-three/drei';
import { MOCK_BUILDINGS, MOCK_EQUIPMENT } from '../data/mock';
import { useCampusStore } from '../store/campusStore';
import { buildingAccentColor, CampusSceneTheme, scenePalette } from './sceneTheme';

interface EquipmentPinsProps {
  theme: CampusSceneTheme;
}

export const EquipmentPins: React.FC<EquipmentPinsProps> = ({ theme }) => {
  const selectedUnitId = useCampusStore((s) => s.selectedUnitId);
  const selectedBuildingId = useCampusStore((s) => s.selectedBuildingId);
  const matchingUnitIds = useCampusStore((s) => s.matchingUnitIds);
  const selectUnit = useCampusStore((s) => s.selectUnit);
  const palette = scenePalette[theme];

  return (
    <group>
      {MOCK_BUILDINGS.map((building) => {
        if (building.equipmentIds.length === 0) return null;

        const count = building.equipmentIds.length;
        const roofY = building.size[1] + 1.2;

        return (
          <group key={building.id} position={building.position}>
            {building.equipmentIds.map((unitId, index) => {
              const unit = MOCK_EQUIPMENT[unitId];
              if (!unit) return null;

              const isSelected = selectedUnitId === unitId;
              const isMatch = matchingUnitIds.includes(unitId);

              // Calculate pin offset positions above building roof
              let offsetX = 0;
              let offsetZ = 0;
              let offsetY = roofY;

              if (count === 2) {
                // Two pins side by side
                offsetX = (index - 0.5) * 2.0;
                offsetZ = (index - 0.5) * -0.4;
              } else if (count === 3) {
                // Triangle layout for 3 pins matching IMAGE 2:
                // Camera (left), GPU (right), VR Headset (front-center)
                if (index === 0) {
                  offsetX = -1.3;
                  offsetZ = -0.7;
                } else if (index === 1) {
                  offsetX = 1.3;
                  offsetZ = -0.7;
                } else {
                  offsetX = 0.0;
                  offsetZ = 0.9;
                  offsetY = roofY - 0.15;
                }
              }

              // Color theme mapping
              let pinBorderColor: string = theme === 'light' ? buildingAccentColor(building, theme) : palette.pin.defaultBorder;
              let pinBgColor: string = palette.pin.defaultBg;
              let pinGlowColor: string = palette.pin.defaultGlow;

              if (building.colorTheme === 'green') {
                pinBorderColor = theme === 'light' ? '#6f7f45' : '#22c55e';
                pinBgColor = theme === 'light' ? 'rgba(255, 248, 234, 0.94)' : 'rgba(6, 38, 20, 0.9)';
                pinGlowColor = theme === 'light' ? 'rgba(111, 127, 69, 0.26)' : 'rgba(34, 197, 94, 0.5)';
              } else if (building.colorTheme === 'orange') {
                pinBorderColor = theme === 'light' ? '#9b5a2e' : '#f97316';
                pinBgColor = theme === 'light' ? 'rgba(255, 248, 234, 0.94)' : 'rgba(40, 18, 6, 0.9)';
                pinGlowColor = theme === 'light' ? 'rgba(155, 90, 46, 0.26)' : 'rgba(249, 115, 22, 0.5)';
              }

              const bobClass =
                index === 0 ? 'pin-bob' : index === 1 ? 'pin-bob-offset-1' : 'pin-bob-offset-2';

              return (
                <Html
                  key={unit.id}
                  position={[offsetX, offsetY, offsetZ]}
                  center
                >
                  <div
                    className={`${bobClass} transition-all duration-300 ${
                      isMatch ? 'opacity-100' : 'opacity-15'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectUnit(unit.id);
                      }}
                      className={`relative group flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-125 focus:outline-none ${
                        isSelected ? 'scale-115' : ''
                      }`}
                      title={`${unit.name} (${unit.statusText})`}
                    >
                      {/* Compact equipment marker */}
                      <div
                        className="relative p-0.5 rounded-full shadow-lg transition-all duration-200"
                        style={{
                          background: pinBgColor,
                          border: `2px solid ${isSelected ? palette.pin.selected : pinBorderColor}`,
                          boxShadow: isSelected
                            ? `0 0 18px ${palette.pin.selected}, 0 0 25px ${pinBorderColor}`
                            : `0 0 14px ${pinGlowColor}`,
                        }}
                      >
                        {/* Cropped Circular Equipment Icon */}
                        <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center" style={{ background: palette.pin.iconBg }}>
                          <img
                            src={unit.iconUrl}
                            alt={unit.name}
                            className="w-full h-full object-cover rounded-full select-none pointer-events-none drop-shadow"
                          />
                        </div>

                        {/* Status Dot Badge on top corner */}
                        <div
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-slate-900 ${
                            unit.status === 'available'
                              ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                              : unit.status === 'booked'
                              ? 'bg-rose-500 shadow-[0_0_6px_#f43f5e]'
                              : 'bg-amber-400 shadow-[0_0_6px_#facc15]'
                          }`}
                        />
                      </div>

                      {/* Teardrop Pointed Stem */}
                      <div
                        className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] -mt-[1px]"
                        style={{
                          borderTopColor: isSelected ? palette.pin.selected : pinBorderColor,
                          filter: `drop-shadow(0 2px 4px ${pinGlowColor})`,
                        }}
                      />
                    </button>
                  </div>
                </Html>
              );
            })}

            {selectedBuildingId === building.id && (
              <Html key={`label-${building.id}`} position={[0, building.size[1] + 1.2, 0]} center>
                <div className={`pointer-events-none select-none rounded-full border px-3 py-1 text-[11px] font-medium shadow-glass backdrop-blur ${palette.label}`}>
                  {building.code}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};
