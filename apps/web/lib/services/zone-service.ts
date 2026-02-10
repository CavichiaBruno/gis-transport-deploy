import { Zone } from "@gis/shared";

export class ZoneService {
    /**
     * Fetches zones (LEZ, Restricted, etc.) around a point from the API.
     */
    static async getZones(lat: number, lon: number, radius = 5000): Promise<Zone[]> {
        try {
            console.log(`[ZoneService] Fetching zones from API for ${lat},${lon} (radius: ${radius}m)`);
            const response = await fetch(`/api/zones?lat=${lat}&lon=${lon}&radius=${radius}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.error("ZoneService Error:", err);
            return [];
        }
    }
}
