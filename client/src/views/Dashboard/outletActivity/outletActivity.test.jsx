
;import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMockStore } from "../../../../test/mocksRedux";
import rootReducer from "../../../redux/reducers";
import OutletActivity from "./index";

describe("OutletActivity", () => {
  let store;

  beforeEach(() => {
    store = createMockStore({});
  });

  test("renders the OutletActivity component", () => {
    render(
      <Provider store={store}>
        <OutletActivity />
      </Provider>
    );
    expect(screen.getByTestId("outlet-activity")).toBeInTheDocument();
  });
});