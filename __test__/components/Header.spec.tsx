/* eslint-disable import/no-unresolved */
import React from "react";
import { shallow } from "enzyme";

import Header from "../../src/components/Header";

describe("<Header />", () => {
  it("renders four li tag", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find("ul Link")).toHaveLength(4);
  });
});
