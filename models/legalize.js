var childProcess = require('child_process');


function legalize(tickets, bills) {
    var solverCommand = './models/solver/money --mode 0 --tickets 3 --ticketsList 3,6,2 --bills 4 --billList 5,1,7,3';
    if(childProcess) {
        childProcess.exec(solverCommand, (err, stdout, stderr) => {
            if (err) {
              console.warn(`command couldn't be executed`);
              return;
            }
          
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
          });
    } else {
        console.log('fuck');
    }
}

module.exports = legalize;