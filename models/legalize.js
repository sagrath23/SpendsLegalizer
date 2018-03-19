const childProcess = require('child_process');

const legalizeDocuments = (tickets, bills) => {
    //TODO: promisify this
    return new Promise((resolve, reject) => {
        if(childProcess) {
            childProcess.exec(
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

module.exports = legalizeDocuments;