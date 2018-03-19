//TODO: mock exec

const legalizeDocuments = require("../models/legalize");

test("Sum of bills is greater than sum of tickets", function(done){ 
    const basicInput = {
        bonos: [3,6,2],
        facturas: [5,1,7,3]
    };
    
    const expectedOutput = ["1", " 1", " 1", " 0", " 1", " 1", " 1"];

    const promise = legalizeDocuments(basicInput.bonos, basicInput.facturas);

    promise.then((result) => {
        expect(result).toEqual(expectedOutput);
        done();
    });
});

test("Sum of tickets are equal to sum of bills", function(done){ 
    const basicInput = {
        bonos: [3,6,2],
        facturas: [1,7,3]
    };
    
    const expectedOutput = ["1", " 1", " 1", " 1", " 1", " 1"];

    const promise = legalizeDocuments(basicInput.bonos, basicInput.facturas);

    promise.then((result) => {
        expect(result).toEqual(expectedOutput);
        done();
    });
});

test("Sum of tickets are greater than sum of bills", function(done){ 
    const basicInput = {
        bonos: [3,6,2,7],
        facturas: [5,1,7,3]
    };
    
    const expectedOutput = ["1", " 1", " 1", " 1", " 1", " 1", " 1", " 1"];

    const promise = legalizeDocuments(basicInput.bonos, basicInput.facturas);

    promise.then((result) => {
        expect(result).toEqual(expectedOutput);
        done();
    }).catch((err) => {
        done.fail(err);
    });
});