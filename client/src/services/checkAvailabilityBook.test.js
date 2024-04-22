import { checkAvailabilityBook } from "./checkAvailabilityBook";

describe("checkAvailabilityBook", () => {
  let bookings;

  beforeEach(() => {
    bookings = [
      {
        _id: "6626269b44f8d7b667a42cb6",
        date: "2024-04-22T00:00:00.000Z",
        startTime: "10:00",
        endTime: "15:00",
        activity: "661f560beacc3a16b91c9cee",
        spot: "661f5595eacc3a16b91c9ceb",
        userMax: "6",
        placesReserved: "0",
      },
    ];
  });

  it("should return false when there are no conflicting bookings", () => {
    const date = "2022-01-01";
    const startTime = "09:00";
    const endTime = "10:00";

    const result = checkAvailabilityBook(date, startTime, endTime, bookings);

    expect(result).toBe(false);
  });

  it("should return true when there is a conflicting booking", () => {
    const date = "2024-04-22";
    const startTime = "11:00";
    const endTime = "12:00";

    const result = checkAvailabilityBook(date, startTime, endTime, bookings);

    expect(result).toBe(true);
  });
});