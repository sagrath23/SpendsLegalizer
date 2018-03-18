var helpers = require("../helpers/helperFunctions");

test('first test', function() {
    expect(helpers.test()).toBeDefined();
    expect(helpers.test()).toBeTruthy();
});