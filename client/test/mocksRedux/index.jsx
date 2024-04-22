import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "../../src/redux/reducers";

/**
 * Creates a mock Redux store with the specified initial state.
 *
 * @param {Object} initialState - The initial state for the store.
 * @returns {Object} - The mock Redux store.
 */
export function createMockStore(initialState = defaultState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });
}


const defaultState = {
  activity: {
    activities: [
      {
        _id: '661bf2c7ac918385c8061c9b',
        name: 'Randonée aquatique',
        description: '',
        half_day: true,
        full_day: true,
        price_half_day: 35,
        price_full_day: 65,
        min_age: 12,
        max_OfPeople: 10,
        min_OfPeople: 4,
        __v: 0
      },
      {
        _id: '661e994e68de9e76664ed129',
        name: 'Escalade',
        description: 'L\'escalade consiste à évoluer verticalement en falaise en toute sécurité (materiels et techniques adaptés)\nGrimper plusieurs voies d\'escalade, de niveaux variés, le plus haut possible. Hauteurs de voies de 6 à 25 mètres.',
        half_day: true,
        full_day: true,
        price_half_day: 40,
        price_full_day: 65,
        min_age: 9,
        max_OfPeople: 6,
        min_OfPeople: 4,
        __v: 0
      },
      {
        _id: '661f560beacc3a16b91c9cee',
        name: 'Spéléologie -découvertes',
        description: '',
        half_day: true,
        full_day: false,
        price_half_day: 40,
        min_age: 5,
        max_OfPeople: 6,
        min_OfPeople: 4,
        __v: 0
      },
      {
        _id: '661f5641eacc3a16b91c9cf0',
        name: 'Spéléologie -sportive',
        description: '',
        half_day: true,
        full_day: false,
        price_half_day: 42,
        min_age: 10,
        max_OfPeople: 6,
        min_OfPeople: 4,
        __v: 0
      }
    ],
    error: null
  },
  spot: {
    spots: [
      {
        _id: '661f554deacc3a16b91c9ce8',
        name: 'Gorges du banquet (Tarn)',
        description: '',
        gpsCoordinates: '43.51320434199122, 2.4760733198652076',
        practicedActivities: [
          {
            activityName: 'Randonée aquatique',
            activityId: '661bf2c7ac918385c8061c9b',
            _id: '661f554deacc3a16b91c9ce9'
          }
        ],
        half_day: true,
        full_day: true,
        max_OfPeople: 5,
        min_OfPeople: 5,
        meetingPoint: 'Néant',
        estimatedDuration: '2h',
        __v: 0
      },
      {
        _id: '661f5595eacc3a16b91c9ceb',
        name: 'Notre-Dame du Cross (Aude)',
        description: '',
        gpsCoordinates: '43.33439960640179, 2.545037176300944',
        practicedActivities: [
          {
            activityName: 'Escalade',
            activityId: '661e994e68de9e76664ed129',
            _id: '661f5595eacc3a16b91c9cec'
          }
        ],
        half_day: true,
        full_day: true,
        max_OfPeople: 8,
        min_OfPeople: 2,
        meetingPoint: 'Néant',
        estimatedDuration: '2h30',
        __v: 0
      },
      {
        _id: '661f56d9eacc3a16b91c9cf4',
        name: 'Cazals; Limousis (Aude)',
        description: '',
        gpsCoordinates: '43.34528898129456, 2.423926104034587',
        practicedActivities: [
          {
            activityName: 'Spéléologie -découvertes',
            activityId: '661f560beacc3a16b91c9cee',
            _id: '661f56d9eacc3a16b91c9cf5'
          },
          {
            activityName: 'Spéléologie -sportive',
            activityId: '661f5641eacc3a16b91c9cf0',
            _id: '661f56d9eacc3a16b91c9cf6'
          }
        ],
        half_day: true,
        full_day: true,
        max_OfPeople: 6,
        min_OfPeople: 4,
        meetingPoint: 'Néant',
        estimatedDuration: '3h',
        __v: 0
      }
    ],
    error: null
  },
  booking: {
    bookings: [
      {
        _id: '6626269b44f8d7b667a42cb6',
        date: '2024-04-22T00:00:00.000Z',
        startTime: '10:00',
        endTime: '15:00',
        activity: '661f560beacc3a16b91c9cee',
        spot: '661f5595eacc3a16b91c9ceb',
        userMax: '10',
        placesReserved: '0',
        __v: 0
      },
      {
        date: '2024-04-23T00:00:00.000Z',
        startTime: '13:45',
        endTime: '15:45',
        activity: '661bf2c7ac918385c8061c9b',
        spot: '661f554deacc3a16b91c9ce8',
        userMax: '5',
        placesReserved: '0',
        _id: '66264f1f44f8d7b667a42dc7'
      }
    ],
    error: null
  }
};
