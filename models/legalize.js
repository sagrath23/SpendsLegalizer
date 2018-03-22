const exec = require("child_process").exec;

const legalizeDocuments = (tickets, bills) => {
    return new Promise((resolve, reject) => {
        if(exec) {
            exec(
                `./models/solver/money --mode 0 --tickets ${tickets.length} --ticketsList ${tickets.join(",")} --bills ${bills.length} --billList ${bills.join(",")}`, 
                (err, stdout, stderr) => {
                    if (err) {
                        reject();
                        return;
                    }
                
                    // the *entire* stdout and stderr (buffered)
                    const allResults = stdout.split("{");
                    const optimalResult = allResults[allResults.length - 1].split("}")[0];
                    
                    const values = optimalResult.split(",");
                    resolve(values);
                });
        } else {
            reject();
        }
    });
       
};

const greedyLegalizeDocuments = (tickets, bills) => {
    // order arrays
    tickets.sort((a, b) =>{
        return a - b
    });
    
    bills.sort((a, b) =>{
        return a - b
    });
    
    var diff = 0;
    var billIndex = 0;

    var legalizedBills = [];
    var legalizedTickets = [];

    for(var ticketIndex=0; ticketIndex < tickets.length; ticketIndex++) {
        diff += tickets[ticketIndex]
        while(billIndex <= bills.length -1 && diff > 0 && diff >= bills[billIndex]) {
            if(diff - bills[billIndex + 1] >= 0){
                //check minimum between diff - bills[billIndex + 1] & diff - bills[billIndex]
                if(diff - bills[billIndex + 1] < diff - bills[billIndex]){
                    //legalize bills[billIndex + 1]
                    legalizedBills.push(bills[billIndex + 1]);
                    //update diff
                    diff -= bills[billIndex+1];
                    // and move billIndex
                    billIndex++;
                } else {
                    //legalize bills[billIndex]
                    legalizedBills.push(bills[billIndex]);
                    //update diff
                    diff -= bills[billIndex];
                }
            } else {
                //diff - bills[billIndex + 1] is greather than diff, so, legalize bill[billIndex]
                legalizedBills.push(bills[billIndex]);
                //update diff
                diff -= bills[billIndex];
            }
            //and move to the next bill
            billIndex++;
        }
        // legalize ticket
        legalizedTickets.push(tickets[ticketIndex]);
    }

    return {
        bonos: legalizedBills.length === 0 ? [] : legalizedTickets,
        facturas: legalizedBills
    }
}

module.exports = greedyLegalizeDocuments;