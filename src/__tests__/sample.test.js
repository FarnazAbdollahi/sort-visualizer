import React from "react";
import Enzyme, { mount } from "enzyme";
import App from "../App";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({
    adapter: new Adapter(),
});

describe("sample_test", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(<App />);
    });
    test("render_bars", () => {
        let list = "12 21 31 13 12 12 31 31 32 32 13 13";
        let arrayInput = wrapper.find("#array");
        arrayInput.simulate("change", { target: { value: list } });
        let bars = wrapper.find(".array-bar");
        list = list.split(" ");
        bars.forEach((item, index) => {
            expect(item.text()).toEqual(list[index]);
            expect(item.props().style["backgroundColor"]).toEqual("limegreen");
            expect(parseInt(item.props().style["height"])).toEqual(
                parseInt(list[index])
            );
        });

        // Check the sort ended message does not exists
        let endSortMessage = wrapper.find("#end-message");
        expect(endSortMessage.length).toEqual(0);
    });
    test("start_sorting", () => {
        jest.useFakeTimers();
        let list = "31 21 12 13 31 31 13 13 12 12";
        let arrayInput = wrapper.find("#array");
        arrayInput.simulate("change", { target: { value: list } });
        let bars = wrapper.find(".array-bar");
        list = list.split(" ");
        bars.forEach((item, index) => {
            expect(item.text()).toEqual(list[index]);
            expect(item.props().style["backgroundColor"]).toEqual("limegreen");
            expect(parseInt(item.props().style["height"])).toEqual(
                parseInt(list[index])
            );
        });

        let counter = insertionSort(list.map((item) => parseInt(item)));

        let startBtn = wrapper.find("#start");
        startBtn.simulate("click");
        let barsSnapshot = [];
        for (let i = 0; i < counter; i++) {
            jest.advanceTimersByTime(50);
            wrapper.update();
            let updatedbars = wrapper.find(".array-bar");
            let newArrayOfElement = [];
            updatedbars.map((item) => {
                newArrayOfElement.push({
                    text: item.text(),
                    height: item.props().style["height"],
                    bgColor: item.props().style["backgroundColor"],
                });
            });
            barsSnapshot.push(newArrayOfElement);
        }

        expect(barsSnapshot).toMatchSnapshot();
        let endSortMessage = wrapper.find("#end-message");
        expect(endSortMessage.length).toEqual(1);
    });
});

const insertionSort = (array) => {
    let steps = [];
    let actions = [];
    let copy = [...array];
    for (let i = 1; i <= copy.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (copy[j + 1] < copy[j]) {
                const temp = copy[j];
                copy[j] = copy[j + 1];
                copy[j + 1] = temp;
                actions.push([j, i]);
                steps.push([...copy]);
            } else {
                actions.push([j, i]);
                steps.push([...copy]);
                break;
            }
        }
    }

    return steps.length;
};
