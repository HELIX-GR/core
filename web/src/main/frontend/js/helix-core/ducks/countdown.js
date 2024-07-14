import countdown from 'countdown';

const config = {
  startDateUTC: [2018, 0, 1, 0, 0, 0],
  startDateCO2Budget: 4.2e+11,
  tonsPerSecond: 1330.899688189216,
};

const startDate = () => {
  const { startDateUTC } = config;

  return new Date(Date.UTC(...startDateUTC));
};

const deadline = () => {
  const { startDateCO2Budget, tonsPerSecond } = config;

  const msRemainingAtStartDate = (startDateCO2Budget / tonsPerSecond * 1000);

  return new Date(startDate().getTime() + msRemainingAtStartDate);
};

const createCountDown = () => {
  const result = countdown(deadline(), new Date(), countdown.YEARS | countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS);

  return result;
};

// Actions
const UPDATE = 'countdown/UPDATE';

const initialState = {
  value: createCountDown(),
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE: {
      const value = createCountDown();

      return {
        value,
      };
    }

    default:
      return state;
  }
};

// Action Creators

export const updateCountDown = () => ({
  type: UPDATE,
});
