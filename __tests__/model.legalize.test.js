const legalizeDocuments = require("../models/legalize");

var nockExec = require('nock-exec');

test("Sum of bills is greater than sum of tickets", function(done){ 
    const basicInput = {
        bonos: [3,6,2],
        facturas: [5,1,7,3]
    };

    const command = `./models/solver/money --mode 0 --tickets ${basicInput.bonos.length} --ticketsList ${basicInput.bonos.join(",")} --bills ${basicInput.facturas.length} --billList ${basicInput.facturas.join(",")}`;
    nockExec(command).out('').outputLine('').err('some error').reply(0, '{1, 1, 1, 0, 1, 1, 1}');
    
    const expectedOutput = ["1", " 1", " 1", " 0", " 1", " 1", " 1"];

    const promise = legalizeDocuments(basicInput.bonos, basicInput.facturas);

    promise.then((result) => {
        expect(result).toEqual(expectedOutput);
        done();
    }).catch((err) => {
        console.log(err);
        done.fail();
    });
});

test("Sum of tickets are equal to sum of bills", function(done){ 
    const basicInput = {
        bonos: [3,6,2],
        facturas: [1,7,3]
    };
    
    const command = `./models/solver/money --mode 0 --tickets ${basicInput.bonos.length} --ticketsList ${basicInput.bonos.join(",")} --bills ${basicInput.facturas.length} --billList ${basicInput.facturas.join(",")}`;
    nockExec(command).out('').outputLine('').err('some error').reply(0, '{1, 1, 1, 1, 1, 1}');

    const expectedOutput = ["1", " 1", " 1", " 1", " 1", " 1"];

    const promise = legalizeDocuments(basicInput.bonos, basicInput.facturas);

    promise.then((result) => {
        expect(result).toEqual(expectedOutput);
        done();
    }).catch((err) => {
        console.log(err);
        done.fail();
    });
});

test("Sum of tickets are greater than sum of bills", function(done){ 
    const basicInput = {
        bonos: [3,6,2,7],
        facturas: [5,1,7,3]
    };
    
    const command = `./models/solver/money --mode 0 --tickets ${basicInput.bonos.length} --ticketsList ${basicInput.bonos.join(",")} --bills ${basicInput.facturas.length} --billList ${basicInput.facturas.join(",")}`;
    nockExec(command).out('').outputLine('').err('some error').reply(0, '{1, 1, 1, 1, 1, 1, 1, 1}');

    const expectedOutput = ["1", " 1", " 1", " 1", " 1", " 1", " 1", " 1"];

    const promise = legalizeDocuments(basicInput.bonos, basicInput.facturas);

    promise.then((result) => {
        expect(result).toEqual(expectedOutput);
        done();
    }).catch((err) => {
        done.fail(err);
    });
});