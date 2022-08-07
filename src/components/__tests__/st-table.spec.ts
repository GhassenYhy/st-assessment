import { shallowMount } from "@vue/test-utils";
import StTable from "@/components/st-table.vue";

describe("StTable test", () => {
  it("renders list and table header when passed", () => {
    const list = ["San fransisco"];
    const tableHeaders = ["City name"];
    const wrapper = shallowMount(StTable, {
      props: {
        list,
        tableHeaders,
      },
    });
    expect(wrapper.text()).toMatch(tableHeaders[0]);
    expect(wrapper.text()).toMatch(list[0]);
  });

  it("renders list and table header when passed", () => {
    const list = ["San fransisco", "test", "test2"];
    const tableHeaders = ["City name", "test", "test2"];
    const wrapper = shallowMount(StTable, {
      props: {
        list,
        tableHeaders,
      },
    });
    expect(wrapper.find("tbody").findAll("tr").length).toBe(list.length);
    expect(wrapper.findAll("th").length).toBe(tableHeaders.length);
  });
});
