/**
 * @file JupyterProblem container module
 * @author Theodor Shaytanov <theodor.shaytanov@gmail.com>
 * @created 08.03.18
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import cloneDeep from "lodash/cloneDeep";

import {
  problemSolutionRefreshFail,
  problemSolveUpdate
} from "../../containers/Problem/actions";
import { notificationShow } from "../../containers/Root/actions";
import JupyterNotebook from "./JupyterNotebook";

class JupyterInlineProblem extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    problem: PropTypes.object,
    solution: PropTypes.object
  };

  state = {
    solutionJSON: false
  };

  onSolutionRefreshClick = value => {
    const { dispatch, onChange, problem } = this.props;

    const solutionJSON = cloneDeep(problem.problemJSON);

    solutionJSON.cells[Number(problem.code)].source = value
      .split("\n")
      .map(line => line + "\n");

    this.setState({
      solutionJSON: solutionJSON || false
    });
    dispatch(problemSolutionRefreshFail());
    if (onChange) {
      onChange(solutionJSON);
    }
    if (!solutionJSON) {
      return dispatch(notificationShow("Code wasn't changed"));
    }

    return dispatch(
      problemSolveUpdate(problem.pathId, problem.problemId, solutionJSON)
    );
  };

  // Move it to paths
  getSolutionCode = (solution, problem) =>
    (this.state.solutionJSON &&
      this.state.solutionJSON.cells &&
      this.state.solutionJSON.cells[Number(problem.code)].source
        .join("")
        .replace(/\n\n/g, "\n")) ||
    (solution &&
      solution.cells &&
      solution.cells[Number(problem.code)].source
        .join("")
        .replace(/\n\n/g, "\n")) ||
    (problem &&
      problem.problemJSON &&
      problem.problemJSON.cells &&
      problem.problemJSON.cells[Number(problem.code)].source
        .join("")
        .replace(/\n\n/g, "\n"));

  render() {
    const {
      /** @type {JupyterPathProblem} */
      problem,
      solution
    } = this.props;

    return (
      <Fragment>
        <JupyterNotebook
          action={this.onSolutionRefreshClick}
          defaultValue={this.getSolutionCode(solution, problem)}
          persistent={true}
          richEditor={true}
          solution={false}
          title="Edit code"
        />
        {solution &&
          solution.json && (
            <JupyterNotebook
              solution={solution}
              title={
                "Calculated Solution" +
                ((solution &&
                  solution.failed &&
                  " - Failing - Final output should be empty") ||
                  "")
              }
            />
          )}
        {solution &&
          solution.provided && (
            <JupyterNotebook
              solution={{ json: solution.provided }}
              title="Provided solution"
            />
          )}
        <JupyterNotebook
          solution={{ json: problem.problemJSON }}
          title="Problem"
        />
      </Fragment>
    );
  }
}

export default JupyterInlineProblem;
