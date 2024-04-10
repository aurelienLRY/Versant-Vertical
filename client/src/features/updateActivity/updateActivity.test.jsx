import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMockStore } from "../../../test/mocksRedux";
import UpdateActivity from "./index";
import { vi } from 'vitest'

describe("UpdateActivity", () => {
  let store;
  const mockModalClosed = vi.fn();

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
    const activ = {
      nom: "Activity 1",
      description: "Description 1",
      _id: "12345"
    };

    render(
      <Provider store={store}>
        <UpdateActivity onOpen={true} activ={activ} modalClosed={mockModalClosed} />
      </Provider>
    );

    expect(screen.getByLabelText("nom de l'activité")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByText("Modifier")).toBeInTheDocument();
  });

  test("submits the form successfully", async () => {
    const activ = {
      nom: "Activity 1",
      description: "Description 1",
      _id: "12345"
    };

    render(
      <Provider store={store}>
        <UpdateActivity onOpen={true} activ={activ} modalClosed={mockModalClosed} />
      </Provider>
    );

    const nomInput = screen.getByLabelText("nom de l'activité");
    const descriptionInput = screen.getByLabelText("Description");
    const submitButton = screen.getByText("Modifier");

    fireEvent.change(nomInput, { target: { value: "Updated Activity" } });
    fireEvent.change(descriptionInput, { target: { value: "Updated Description" } });
    fireEvent.click(submitButton);

    // Add your assertions here to check if the form submission is successful

    // Example assertion: expect(mockModalClosed).toHaveBeenCalledWith(false);
  });
});