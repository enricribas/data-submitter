interface Metric {
  id: string;
  title: string;
  tooltip?: string;
  status: string;
  submetrics?: Array<{
    id: string;
    title: string;
    status: string;
  }>;
}

export function mergeRecordWithOverride(response: Metric[], apiRecord: any): Metric[] {
  if (!apiRecord || !apiRecord.dashboardSettings) {
    return response;
  }

  const mergedResponse = response.map(baseItem => {
    const apiItem = apiRecord.dashboardSettings.find((item: Metric) => item.id === baseItem.id);
    return apiItem ? { ...baseItem, ...apiItem } : baseItem;
  });

  // Add any new items from apiRecord that don't exist in the base response
  apiRecord.dashboardSettings.forEach((apiItem: Metric) => {
    if (!mergedResponse.some(item => item.id === apiItem.id)) {
      mergedResponse.push(apiItem);
    }
  });

  return mergedResponse;
}