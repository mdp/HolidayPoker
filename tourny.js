var MachinePoker = require('machine-poker');
var narrator = MachinePoker.observers.narrator;
var now = new Date();
var dateStr = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
var fileLogger = MachinePoker.observers.fileLogger('./results/results-'+ dateStr +'.json');
var argv = require('optimist')
    .default({
        maxRounds : 1000,
        chips : 1000,
        blind : 10,
        raise : 20
    })
    .argv
;

var table = MachinePoker.create({
  "maxRounds" : argv.maxRounds,
  "chips" : argv.chips,
  "betting" : MachinePoker.betting.noLimit(argv.blind,argv.raise)
});

table.addPlayer(
  "https://raw.github.com/gist/d2d69b3178379458d2b9/HardlyKnower.js"
);
table.addPlayer(
  "https://raw.github.com/gist/affa85924b3b9ba115dd/rpj-losing_statelessly.js",
  {name: "Losing Statelessly - @rpj"}
);
table.addPlayer(
  "https://raw.github.com/gist/7ea74e5aca4da2265382/bot.js",
  {name: "Rucky Bot - @chenosaurus"}
);
table.addPlayer(
  "https://raw.github.com/gist/ee24fb0ebcf00fbc9f23/jacksorbetterbot.js",
  {name: "Jacks Or Better - @kylar42"}
);
table.addPlayer(
  "https://raw.github.com/gist/d31631979712637eccb8/chanian_bot.js",
  {name: "Agro Bot - @chanian"}
);
table.addPlayer(
  "https://raw.github.com/gist/987e6e7c11877c4879c0/bot.js",
  {name: "Madanr Bot - @madanr"}
);
table.addPlayer(
  "https://raw.github.com/mdp/DownToTheFelt/master/lib/player.min.js"
);

// Add some observers
table.addObserver(narrator);
table.addObserver(fileLogger);

table.on('ready', function() {
  console.log('ready');
  table.start();
});

