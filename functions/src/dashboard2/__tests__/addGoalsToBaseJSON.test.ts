import { addGoalsToBaseJSON } from '../utils/addGoalsToBaseJSON';
import { baseJSON } from '../baseJSON';

describe('addGoalsToBaseJSON', () => {
    it('should add Goals and DataSubmits metrics with submetrics based on provided goals and dataSubmits', () => {
        const goals = ['move in', 'tours', 'calls'];
        const dataSubmits = ['CRM', 'Email', 'EHR'];
        const result = addGoalsToBaseJSON(baseJSON, goals, dataSubmits);

        expect(result).toContainEqual(expect.objectContaining({
            id: 'Goals',
            title: 'Goals',
            tooltip: expect.any(String),
            status: 'hidden',
            submetrics: expect.arrayContaining([
                { id: 'move_in_count', title: 'move in (Count)', status: 'hidden' },
                { id: 'move_in_money', title: 'move in ($)', status: 'hidden' },
                { id: 'tours_count', title: 'tours (Count)', status: 'hidden' },
                { id: 'tours_money', title: 'tours ($)', status: 'hidden' },
                { id: 'calls_count', title: 'calls (Count)', status: 'hidden' },
                { id: 'calls_money', title: 'calls ($)', status: 'hidden' },
            ]),
        }));

        expect(result).toContainEqual(expect.objectContaining({
            id: 'DataSubmits',
            title: 'Data Submits',
            tooltip: expect.any(String),
            status: 'hidden',
            submetrics: expect.arrayContaining([
                { id: 'crm', title: 'CRM', status: 'hidden' },
                { id: 'email', title: 'Email', status: 'hidden' },
                { id: 'ehr', title: 'EHR', status: 'hidden' },
            ]),
        }));
    });

    it('should maintain the same number of metrics when Goals and DataSubmits already exist', () => {
        const initialLength = baseJSON.length;
        const goals = ['move in', 'tours', 'calls'];
        const dataSubmits = ['CRM', 'Email', 'EHR'];
        const result = addGoalsToBaseJSON(baseJSON, goals, dataSubmits);

        expect(result.length).toBe(initialLength);

    });

    it('should increase the number of metrics when Goals or DataSubmits do not exist', () => {
        const baseJSONWithoutGoalsAndDataSubmits = baseJSON.filter(metric => metric.id !== 'Goals' && metric.id !== 'DataSubmits');
        const initialLength = baseJSONWithoutGoalsAndDataSubmits.length;
        const goals = ['move in', 'tours', 'calls'];
        const dataSubmits = ['CRM', 'Email', 'EHR'];
        const result = addGoalsToBaseJSON(baseJSONWithoutGoalsAndDataSubmits, goals, dataSubmits);

        expect(result.length).toBe(initialLength + 2);
    });

    it('should handle empty goals and dataSubmits arrays', () => {
        const goals: string[] = [];
        const dataSubmits: string[] = [];
        const result = addGoalsToBaseJSON(baseJSON, goals, dataSubmits);

        expect(result).toContainEqual(expect.objectContaining({
            id: 'Goals',
            submetrics: [],
        }));

        expect(result).toContainEqual(expect.objectContaining({
            id: 'DataSubmits',
            submetrics: [],
        }));
    });
});