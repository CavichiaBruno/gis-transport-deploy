import { GisDashboardData } from "@/lib/types/dashboard";

export class GisDataService {
  /**
   * Saves a new snapshot of the GIS state.
   */
  static async saveSnapshot(context: any): Promise<string> {
    const response = await fetch('/api/gis/snapshot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(context),
    });

    if (!response.ok) {
      throw new Error(`Failed to save snapshot: ${response.statusText}`);
    }

    const result = await response.json();
    return result.id;
  }

  /**
   * Retrieves the latest GIS state snapshot.
   */
  static async getLatestSnapshot(): Promise<GisDashboardData | null> {
    const response = await fetch('/api/gis/snapshot');

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to get snapshot: ${response.statusText}`);
    }

    const result = await response.json();
    return result.success ? result.data : null;
  }
}
