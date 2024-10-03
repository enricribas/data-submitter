export interface Metric {
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