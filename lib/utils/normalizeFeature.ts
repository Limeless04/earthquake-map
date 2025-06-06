import { EarthquakeFeature } from "../types/earthquake";

export type DepthCategory = "shallow" | "intermediate" | "deep";

function findDepth(depth: number): DepthCategory {
  if (depth <= 30) return "shallow";
  if (depth <= 100) return "intermediate";
  return "deep";
}

export interface NormalizedFeature {
  type: "Feature";
  properties: {
    id: string;
    time: Date;
    mag: number;
    place: string;
    fase: string;
    approxRadius: number;
    status: string;
    depth: number;
    depthCategory: DepthCategory;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number, number]; // lon, lat, depthCoord
  };
}

export const normalizeFeature = (raw: EarthquakeFeature): NormalizedFeature => {
  const lon = parseFloat(raw.geometry.coordinates[0]);
  const lat = parseFloat(raw.geometry.coordinates[1]);
  const depthCoord = raw.geometry.coordinates[2];

  const depth = parseFloat(raw.properties.depth);
  const mag = parseFloat(raw.properties.mag);
  const approxRadius = Math.pow(10, 0.43 * mag) * 0.1;
  const time = new Date(raw.properties.time);
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lon, lat, depthCoord],
    },
    properties: {
      id: raw.properties.id,
      place: raw.properties.place,
      fase: raw.properties.fase,
      status: raw.properties.status,
      mag,
      approxRadius,
      depth,
      time,
      depthCategory: findDepth(depth),
    },
  };
};
