//TODO: mock exec

const legalizeDocuments = require("../models/legalize");

test("Basic test", function(){ 
    const basicInput = {
        bonos: [3,6,2],
        facturas: [5,1,7,3]
    };
    
    const expectedOutput = ["1", " 1", " 1", " 0", " 1", " 1", " 1"]

    const promise = legalizeDocuments(basicInput.bonos, basicInput.facturas);

    promise.then((result) => {
        expect(result).toEqual(expectedOutput);
    });
});