var greedyLegalizeDocuments = require("../models/legalize");

test("base test case", () => {
    var tickets = [3,6,2];
    var bills = [5,1,7,3];

    var expectedValue = {
        bonos: [2,3,6],
        facturas: [1,3,7]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
})

test("tickets and bills are equals", () => {
    var tickets = [3,6,2];
    var bills = [3,6,2];

    var expectedValue = {
        bonos: [2,3,6],
        facturas: [2,3,6]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
})

test("sum of tickets is greater than sum of bills", () => {
    var tickets = [3,6,2];
    var bills = [1,7,3];

    var expectedValue = {
        bonos: [2,3,6],
        facturas: [1,3,7]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
})

test("sum of tickets only allow to legalize lower bill", () => {
    var tickets = [3,6,2];
    var bills = [12,11,15];

    var expectedValue = {
        bonos: [2,3,6],
        facturas: [11]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
})
/*
test("sum of bills will be legalized by lower ticket", () => {
    var tickets = [11,8,6];
    var bills = [2,1,3];

    var expectedValue = {
        bonos: [6],
        facturas: [1,2,3]
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
})
*/
test("sum of tickets is lower to any bill", () => {
    var tickets = [3,6,2];
    var bills = [12,21,15];

    var expectedValue = {
        bonos: [],
        facturas: []
    }

    expect(greedyLegalizeDocuments(tickets, bills)).toEqual(expectedValue);
})