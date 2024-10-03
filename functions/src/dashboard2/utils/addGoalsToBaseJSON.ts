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

export function addGoalsToBaseJSON(baseJSON: Metric[], goals: string[], dataSubmits: string[]): Metric[] {
  const goalsMetric: Metric = {
    id: "Goals",
    title: "Goals",
    tooltip: "The number of times a chatbot user successfully completed a set goal within the conversation.",
    status: "hidden",
    submetrics: goals.flatMap(goal => [
      { id: `${goal.toLowerCase().replace(/\s+/g, '_')}_count`, title: `${goal} (Count)`, status: "hidden" },
      { id: `${goal.toLowerCase().replace(/\s+/g, '_')}_money`, title: `${goal} ($)`, status: "hidden" }
    ])
  };

  const dataSubmitsMetric: Metric = {
    id: "DataSubmits",
    title: "Data Submits",
    tooltip: "The number of times a chat sent data to another system like a CRM, EHR, email or other.",
    status: "hidden",
    submetrics: dataSubmits.map(submit => (
      { id: `${submit.toLowerCase().replace(/\s+/g, '_')}`, title: submit, status: "hidden" }
    ))
  };

  const updatedMetrics = baseJSON.map(metric => {
    if (metric.id === "Goals") return goalsMetric;
    if (metric.id === "DataSubmits") return dataSubmitsMetric;
    return metric;
  });

  if (!updatedMetrics.some(metric => metric.id === "Goals")) {
    updatedMetrics.push(goalsMetric);
  }

  if (!updatedMetrics.some(metric => metric.id === "DataSubmits")) {
    updatedMetrics.push(dataSubmitsMetric);
  }

  return updatedMetrics;
}