
// percentual da margem de tolerancia para trocar de status
const STATUS_TOLERANCE = 0.10;

module.exports = function getMeasureStatus(measure, limits) {

  const maximumDeviation = (limits.maximum - limits.minimum) * STATUS_TOLERANCE;

  if (measure >= limits.minimum + maximumDeviation && measure <= limits.maximum - maximumDeviation) {
    return "Ok";

  } else if (
    measure >= limits.minimum && measure <= limits.minimum + maximumDeviation ||
    measure >= limits.maximum - maximumDeviation && measure <= limits.maximum
  ) {
    return "Atenção";

  } else if (measure < limits.minimum || measure > limits.maximum) {
    return "Revisão";
  }
}