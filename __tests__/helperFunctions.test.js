var helpers = require("../helpers/helperFunctions");

test("first test", function() {
    expect(helpers.test()).toBeDefined();
    expect(helpers.test()).toBeTruthy();
});

test("second test", function() {
    expect(helpers.anotherTest()).toBeDefined();
    expect(helpers.anotherTest()).toBeFalsy();
});