import React from "react";
import sinon from "sinon";

import { createShallow } from "@material-ui/core/test-utils";
import Button from "@material-ui/core/Button";

import { Problem } from "../Problem";
import ProblemView from "../../../components/problemViews/ProblemView";

describe("<Problem>", () => {
  let shallow;
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = sinon.spy();
    shallow = createShallow();
  });

  it("should check snapshot", () => {
    const wrapper = shallow(<Problem match={{ params: {} }} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should update internal state", () => {
    const wrapper = shallow(
      <Problem
        dispatch={mockDispatch}
        match={{
          params: {
            pathId: "testPath",
            problemId: "testProblem"
          }
        }}
        pathProblem={{}}
      />
    );

    expect(wrapper.state("problemSolution"), {});
    wrapper.find(ProblemView).simulate("problem-change", "test");
    expect(wrapper.state("problemSolution"), "test");
  });

  it("should dispatch problemSolutionSubmitRequest", () => {
    const wrapper = shallow(
      <Problem
        dispatch={mockDispatch}
        match={{
          params: {
            pathId: "testPath",
            problemId: "testProblem"
          }
        }}
        pathProblem={{}}
      />
    );

    wrapper.setState({
      problemSolution: "test"
    });
    wrapper.find(Button).simulate("click");

    expect(mockDispatch.calledOnce);
  });
});
