import { render, fireEvent, screen ,waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMockStore } from '../../../test/mocksRedux';
import rootReducer from "../../redux/reducers";
import AllActivities from './';

describe("AllActivities", () => {
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

  it("renders activities", () => {
    render(
      <Provider store={store}>
        <AllActivities />
      </Provider>
    );

    const activities = store.getState().activity.activities;
    activities.forEach((activity) => {
      expect(screen.getByText(activity.nom)).toBeInTheDocument();
      expect(screen.getByText(activity.description)).toBeInTheDocument();
    });
  });

  it("calls handleEdit when edit button is clicked", async () => {
    render(
      <Provider store={store}>
        <AllActivities  />
      </Provider>
    );

    const editButtons = screen.getAllByText("Modifier");
    fireEvent.click(editButtons[0]);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });


});