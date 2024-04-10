import { render, screen, fireEvent } from "@testing-library/react";
import { createMockStore } from "../../../test/mocksRedux";
import { Provider } from "react-redux";
import CreateActivity from "./index";

describe("CreateActivity", () => {
  let store;

  beforeEach(() => {
    store = createMockStore({
      activity: {
        activities: [
          { _id: "1", nom: "Activity 1", description: "Description 1" },
          { _id: "2", nom: "Activity 2", description: "Description 2" },
        ]
      }
    });
  });

  test("renders the form correctly", () => {
    render(
      <Provider store={store}>
        <CreateActivity />
      </Provider>
    );

    expect(screen.getByTestId("create-activity")).toBeInTheDocument();
    expect(screen.getByLabelText("Nom de l'activité")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByText("Enregistrer")).toBeInTheDocument();
  });

  test("submits the form successfully", () => {
    render(
      <Provider store={store}>
        <CreateActivity />
      </Provider>
    );

    const nomInput = screen.getByLabelText("Nom de l'activité");
    const descriptionInput = screen.getByLabelText("Description");
    const submitButton = screen.getByText("Enregistrer");

    fireEvent.change(nomInput, { target: { value: "Activity 1" } });
    fireEvent.change(descriptionInput, { target: { value: "Description 1" } });
    fireEvent.click(submitButton);

    // Add your assertions here to check if the form submission is successful
  });
});
