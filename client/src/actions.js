/*ACTION TYPES*/

export const INPUT_COUNT_CHANGED = 'INPUT_COUNT_CHANGED';
export const OUTPUT_COUNT_CHANGED = 'OUTPUT_COUNT_CHANGED';

/*ACTION CREATORS*/

export function inputCountChanged(newValue) {
    return {type: INPUT_COUNT_CHANGED, newValue};
}

export function outputCountChanged(newValue) {
    return {type: OUTPUT_COUNT_CHANGED, newValue};
}