import React from 'react';
import { Competence } from '../types';

interface CompetenceRadarProps {
  competences: Competence[];
  size?: number;
}

const CompetenceRadar = ({ competences, size = 200 }: CompetenceRadarProps) => {
  const center = size / 2;
  const radius = size / 2 - 20;
  const numCompetences = competences.length;

  const getScoreFromStatus = (status: string): number => {
    switch (status) {
      case 'non_acquis': return 0;
      case 'en_cours': return 0.5;
      case 'acquis': return 0.8;
      case 'valide': return 1;
      default: return 0;
    }
  };

  const getColor = (score: number): string => {
    if (score >= 0.8) return '#10b981'; // green
    if (score >= 0.5) return '#f59e0b'; // yellow
    if (score > 0) return '#ef4444'; // red
    return '#6b7280'; // gray
  };

  const points = competences.map((comp, index) => {
    const angle = (2 * Math.PI * index) / numCompetences - Math.PI / 2;
    const score = getScoreFromStatus(comp.status);
    const x = center + Math.cos(angle) * radius * score;
    const y = center + Math.sin(angle) * radius * score;
    return { x, y, score, comp };
  });

  const maxPoints = competences.map((comp, index) => {
    const angle = (2 * Math.PI * index) / numCompetences - Math.PI / 2;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    return { x, y };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z';

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="relative">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {gridLevels.map((level, index) => (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={radius * level}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Grid lines */}
        {maxPoints.map((point, index) => (
          <line
            key={index}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Competence area */}
        <path
          d={pathData}
          fill="rgba(59, 130, 246, 0.1)"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Competence points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={getColor(point.score)}
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {competences.map((comp, index) => {
          const angle = (2 * Math.PI * index) / numCompetences - Math.PI / 2;
          const labelRadius = radius + 15;
          const x = center + Math.cos(angle) * labelRadius;
          const y = center + Math.sin(angle) * labelRadius;
          
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
              fill="#6b7280"
              className="font-medium"
            >
              {comp.nom.length > 15 ? `${comp.nom.substring(0, 15)}...` : comp.nom}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
          <span>Non acquis</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-400 rounded-full mr-1"></div>
          <span>En cours</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></div>
          <span>Acquis</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 rounded-full mr-1"></div>
          <span>Validé</span>
        </div>
      </div>
    </div>
  );
};

export default CompetenceRadar;