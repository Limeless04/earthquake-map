// types/Feature.ts
export interface EarthquakeFeature {
  type: "Feature";
  properties: {
    id: string;
    time: string; // consider converting to Date when parsing
    mag: string; // consider converting to number
    place: string;
    fase: string;
    status: string;
    depth: string; // consider converting to number
  };
  geometry: {
    type: "Point";
    coordinates: [string, string, number]; // lon, lat, depth
  };
}
