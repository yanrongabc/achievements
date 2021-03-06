import React from "react";
import { createShallow } from "@material-ui/core/test-utils";

import sinon from "sinon";

import JupyterInlineProblem from "../JupyterInlineProblem";

describe("<JupyterInlineProblem>", () => {
  let mockDispatch;
  let shallow;

  beforeEach(() => {
    mockDispatch = sinon.spy();
    shallow = createShallow();
  });

  it("should check snapshot", () => {
    const wrapper = shallow(
      <JupyterInlineProblem
        dispatch={mockDispatch}
        problem={{
          problemJSON: "test"
        }}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("is just mock test", () => {
    const wrapper = shallow(
      <JupyterInlineProblem
        dispatch={mockDispatch}
        problem={{
          code: 0,
          problemJSON: {
            cells: [
              {
                source: []
              },
              "foobar"
            ]
          }
        }}
      />
    );

    wrapper.instance().onSolutionRefreshClick("test");
    // wrapper.instance().getSolutionCode({}, {});
    expect(wrapper.state("solutionJSON")).toEqual({
      cells: [{ source: ["test\n"] }, "foobar"]
    });
    expect(mockDispatch.called).toEqual(true);
  });
});
