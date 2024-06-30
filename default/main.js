var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransferer = require('role.transferer');
var SpawnFunction = require('Spawn');

module.exports.loop = function () {
    var creepsNumList = [0,0];
    for(var name in Memory.creeps) { // 释放内存
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
            continue;
        }
        creepsNumList[Memory.creeps[name].workLoc] = creepsNumList[Memory.creeps[name].workLoc] + 1;
    }
    var spawn1 = Game.spawns['Spawn1'];
    creepsNumList = SpawnFunction.run(spawn1,creepsNumList);

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'tansferer') {
            roleTransferer.run(creep);
        }
    }
}