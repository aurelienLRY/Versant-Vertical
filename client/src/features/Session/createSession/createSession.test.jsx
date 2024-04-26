import { render, screen, fireEvent } from "@testing-library/react";
import { createMockStore } from "../../../../test/mocksRedux";
import { Provider } from "react-redux";
import CreateSession from "./index";

describe("CreateSession", () => {
  let store;

  beforeEach(() => {
    store = createMockStore();  });

  test("renders the form correctly", () => {
    render(
      <Provider store={store}>
        <CreateSession isOpened={true} modalClosed={() => {}} />
      </Provider>
    );

    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Heure de début")).toBeInTheDocument();
    expect(screen.getByLabelText("Heure de fin")).toBeInTheDocument();
    expect(screen.getByLabelText("Activité")).toBeInTheDocument();
    expect(screen.getByLabelText("Lieu")).toBeInTheDocument();
    expect(screen.getByLabelText("Personnes maximums")).toBeInTheDocument();
    expect(screen.getByLabelText("Places réservées")).toBeInTheDocument();
    expect(screen.getByText("Enregistrer")).toBeInTheDocument();
  });

  test("submits the form successfully", () => {
    render(
      <Provider store={store}>
        <CreateSession isOpened={true} modalClosed={() => {}} />
      </Provider>
    );

    const dateInput = screen.getByLabelText("Date");
    const startTimeInput = screen.getByLabelText("Heure de début");
    const endTimeInput = screen.getByLabelText("Heure de fin");
    const activitySelect = screen.getByLabelText("Activité");
    const spotSelect = screen.getByLabelText("Lieu");
    const maxOfPeopleInput = screen.getByLabelText("Personnes maximums");
    const placesReservedInput = screen.getByLabelText("Places réservées");
    const submitButton = screen.getByText("Enregistrer");

    fireEvent.change(dateInput, { target: { value: "2022-01-03" } });
    fireEvent.change(startTimeInput, { target: { value: "10:00" } });
    fireEvent.change(endTimeInput, { target: { value: "11:00" } });
    fireEvent.change(activitySelect, { target: { value: "1" } });
    fireEvent.change(spotSelect, { target: { value: "1" } });
    fireEvent.change(maxOfPeopleInput, { target: { value: "5" } });
    fireEvent.change(placesReservedInput, { target: { value: "3" } });
    fireEvent.click(submitButton);



    // Add your assertions here to check if the form submission is successful
  });
});