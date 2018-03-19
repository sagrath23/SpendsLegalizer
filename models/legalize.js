const childProcess = require('child_process');

const legalizeDocuments = (tickets, bills) => {
    //TODO: promisify this
    return new Promise((resolve, reject) => {
        const  solverCommand = `./models/solver/money --mode 0 --tickets ${tickets.length} --ticketsList ${tickets.join(",")} --bills ${bills.length} --billList ${bills.join(",")}`;
        if(childProcess) {
            childProcess.exec(solverCommand, (err, stdout, stderr) => {
                if (err) {
                console.warn(`command couldn't be executed`);
                return;
                }
            
                // the *entire* stdout and stderr (buffered)
                const allResults = stdout.split("{");
                const optimalResult = allResults[allResults.length - 1].split("}")[0];
                
                const values = optimalResult.split(",");
                resolve(values);
            });
        } else {
            console.warn(`childProcess library not found.`);
            reject();
        }
    });
       
};

module.exports = legalizeDocuments;