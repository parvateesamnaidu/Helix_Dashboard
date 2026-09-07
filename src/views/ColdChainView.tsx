import React, { useState } from 'react';
import { useWorkbench } from '../context/WorkbenchContext';
import { useAuth } from '../context/AuthContext';
import {
  ThermometerSnowflake,
  AlertTriangle,
  Radio,
  Battery,
  MapPin,
  Clock,
  ShieldAlert,
  Play,
  CheckCircle2,
  Sliders,
  TrendingDown,
} from 'lucide-react';
import { ColdChainExcursion } from '../types';

export const ColdChainView: React.FC = () => {
  const { selectedBatch, simulateExcursion } = useWorkbench();
  const { currentUser, checkPermission } = useAuth();

  // Interactive excursion simulator state
  const [simTemp, setSimTemp] = useState<number>(-115);
  const [simDuration, setSimDuration] = useState<number>(35);
  const [simSeverity, setSimSeverity] = useState<ColdChainExcursion['severity']>('LEVEL_2_CRITICAL');

  const handleSimulate = () => {
    simulateExcursion(selectedBatch.id, simSeverity, simTemp, simDuration);
  };

  const calculateDegreeHours = (temp: number, durationMins: number) => {
    const delta = Math.max(0, temp - -150);
    return Math.round((delta * (durationMins / 60)) * 10) / 10;
  };

  const degreeHours = calculateDegreeHours(simTemp, simDuration);

  // Dynamic classification based on user sliders
  const derivedSeverity: ColdChainExcursion['severity'] =
    simTemp > -100 || simDuration > 90
      ? 'LEVEL_3_HARD_BLOCK'
      : simTemp > -130 || simDuration > 25
      ? 'LEVEL_2_CRITICAL'
      : 'LEVEL_1_WARNING';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
            IoT Cryogenic Cold-Chain Telemetry & Excursion Severity Engine
          </div>
          <h2 className="text-lg font-bold text-slate-100 mt-1">
            Liquid Nitrogen Vapor Phase Profile & Hard-Constraint Gating
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Per PRD FR-04 & CTRL-04: Excursions are strictly classified by <strong>severity × duration</strong> (cumulative degree-hours), not simple presence/absence. Hard thermal boundaries prevent compromised batch releases.
          </p>
        </div>

        <div className="bg-slate-950 px-4 py-2 rounded-lg border border-slate-800 text-xs text-right">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Batch Focus</div>
          <div className="font-mono font-bold text-cyan-300">{selectedBatch.batchNumber}</div>
        </div>
      </div>

      {/* Active Excursion Alert if Present */}
      {selectedBatch.excursion && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-3 shadow-lg ${
            selectedBatch.excursion.severity === 'LEVEL_3_HARD_BLOCK'
              ? 'bg-rose-950/60 border-rose-700 text-rose-200'
              : selectedBatch.excursion.severity === 'LEVEL_2_CRITICAL'
              ? 'bg-amber-950/60 border-amber-700 text-amber-200'
              : 'bg-cyan-950/60 border-cyan-700 text-cyan-200'
          }`}
        >
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider">
                {selectedBatch.excursion.severity.replace(/_/g, ' ')} DETECTED
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-black/40">
                Peak: {selectedBatch.excursion.peakTempC}°C for {selectedBatch.excursion.durationMinutes} min
              </span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-black/40">
                {selectedBatch.excursion.degreeHours} °C·hr
              </span>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">
              {selectedBatch.excursion.dispositionAction}
            </p>
            {selectedBatch.excursion.requiresQpAdjudication && (
              <div className="text-[11px] font-bold text-amber-300 pt-1">
                Escalated to Qualified Person: Batch release gated until stability re-test confirmation.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Telemetry Dashboard & Live Thermal Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Thermal Profile Canvas */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>LN2 Vapor Phase Thermal Profile (-196°C to -150°C Safe Zone)</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Current: {selectedBatch.coldChainReadings[0]?.tempCelsius || -188.4}°C
            </span>
          </div>

          {/* Graphical Thermal Safe-Zone Envelope */}
          <div className="space-y-2">
            <div className="relative h-44 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
              {/* Thermal Threshold Markers */}
              <div className="flex justify-between items-center text-[10px] font-mono text-rose-400 border-b border-rose-900/40 pb-1">
                <span>Critical Excursion Limit (-120°C)</span>
                <span>Level 2 / Level 3 Hard Block</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-amber-400 border-b border-amber-900/40 pb-1">
                <span>Warning Limit (-150°C)</span>
                <span>Level 1 Warning</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-emerald-400">
                <span>Nominal Vapor Phase (-180°C to -196°C)</span>
                <span>Target Viability Safe Zone</span>
              </div>

              {/* Dynamic Temperature Bar */}
              <div className="mt-2 bg-slate-900 rounded-lg p-3 border border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-300">
                  Shipper Container LN2 Vapor Status:
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-emerald-300 font-bold text-sm">
                    {selectedBatch.coldChainReadings[0]?.nitrogenVaporLevel || 'OPTIMAL'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Telemetry Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Recent IoT Sensor Data Packets
            </h4>
            <div className="space-y-1.5">
              {selectedBatch.coldChainReadings.map((reading, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs flex items-center justify-between font-mono"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-bold">{reading.tempCelsius}°C</span>
                    <span className="text-slate-400">{reading.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span className="text-emerald-400">{reading.nitrogenVaporLevel}</span>
                    <span>{reading.timestamp.slice(11, 19)} UTC</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipper Hardware Specs & Interactive Excursion Simulator */}
        <div className="space-y-6">
          {/* Hardware Telemetry Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              Cryo-Shipper Device Status
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-850">
                <span className="text-slate-400">Sensor Hardware ID:</span>
                <span className="font-mono text-slate-200">{selectedBatch.crossSystemIdentifiers.iotCryoId}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-850">
                <span className="text-slate-400 flex items-center gap-1">
                  <Battery className="w-3.5 h-3.5 text-emerald-400" /> Battery Level:
                </span>
                <span className="font-mono text-emerald-300 font-bold">96% (Lithium Cryo-Cell)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-850">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Vault Location:
                </span>
                <span className="text-slate-200 font-medium">Basel Tank Core #04</span>
              </div>
            </div>
          </div>

          {/* Interactive Severity × Duration Simulator (FR-04 / GS-03) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Interactive Excursion Simulator (FR-04)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Test PRD FR-04 rule: a 5°C/11-min event vs a 5°C/2-hour event triggers distinct regulatory disposition pathways.
            </p>

            <div className="space-y-3">
              {/* Peak Temperature Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Peak Temperature:</span>
                  <span className="font-mono text-amber-400 font-bold">{simTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="-80"
                  value={simTemp}
                  onChange={(e) => setSimTemp(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Duration Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Duration (Minutes):</span>
                  <span className="font-mono text-amber-400 font-bold">{simDuration} min</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={simDuration}
                  onChange={(e) => setSimDuration(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Live Metric */}
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs flex justify-between items-center">
                <span className="text-slate-400">Classified Severity:</span>
                <span
                  className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded ${
                    derivedSeverity === 'LEVEL_3_HARD_BLOCK'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : derivedSeverity === 'LEVEL_2_CRITICAL'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  }`}
                >
                  {derivedSeverity}
                </span>
              </div>

              <button
                onClick={() => {
                  simulateExcursion(selectedBatch.id, derivedSeverity, simTemp, simDuration);
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition shadow-sm"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate IoT Excursion Telemetry</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
