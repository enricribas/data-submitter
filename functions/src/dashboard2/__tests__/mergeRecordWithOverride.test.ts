import { mergeRecordWithOverride } from '../utils/mergeRecordWithOverride';

describe('mergeRecordWithOverride', () => {
  const baseResponse = [
    { id: 'metric1', title: 'Metric 1', status: 'visible' },
    { id: 'metric2', title: 'Metric 2', status: 'hidden' },
    { id: 'metric3', title: 'Metric 3', status: 'visible' },
  ];

  it('should return the base response when apiRecord is null or undefined', () => {
    expect(mergeRecordWithOverride(baseResponse, null)).toEqual(baseResponse);
    expect(mergeRecordWithOverride(baseResponse, undefined)).toEqual(baseResponse);
  });

  it('should return the base response when apiRecord.dashboardSettings is missing', () => {
    const apiRecord = { someOtherProperty: 'value' };
    expect(mergeRecordWithOverride(baseResponse, apiRecord)).toEqual(baseResponse);
  });

  it('should override properties in base response with those from apiRecord', () => {
    const apiRecord = {
      dashboardSettings: [
        { id: 'metric1', status: 'hidden' },
        { id: 'metric2', title: 'Updated Metric 2' },
      ]
    };
    const expected = [
      { id: 'metric1', title: 'Metric 1', status: 'hidden' },
      { id: 'metric2', title: 'Updated Metric 2', status: 'hidden' },
      { id: 'metric3', title: 'Metric 3', status: 'visible' },
    ];
    expect(mergeRecordWithOverride(baseResponse, apiRecord)).toEqual(expected);
  });

  it('should add new metrics from apiRecord that are not in base response', () => {
    const apiRecord = {
      dashboardSettings: [
        { id: 'metric4', title: 'New Metric', status: 'visible' },
      ]
    };
    const expected = [
      ...baseResponse,
      { id: 'metric4', title: 'New Metric', status: 'visible' },
    ];
    expect(mergeRecordWithOverride(baseResponse, apiRecord)).toEqual(expected);
  });

  it('should ensure unique ids in the response', () => {
    const apiRecord = {
      dashboardSettings: [
        { id: 'metric1', status: 'hidden' },
        { id: 'metric4', title: 'New Metric', status: 'visible' },
      ]
    };
    const result = mergeRecordWithOverride(baseResponse, apiRecord);
    const uniqueIds = new Set(result.map(item => item.id));
    expect(uniqueIds.size).toBe(result.length);
  });

  it('should prioritize apiRecord data for matching ids', () => {
    const apiRecord = {
      dashboardSettings: [
        { id: 'metric1', title: 'Overridden Metric 1', status: 'hidden', newProp: 'value' },
      ]
    };
    const result = mergeRecordWithOverride(baseResponse, apiRecord);
    expect(result.find(item => item.id === 'metric1')).toEqual({
      id: 'metric1',
      title: 'Overridden Metric 1',
      status: 'hidden',
      newProp: 'value'
    });
  });
});