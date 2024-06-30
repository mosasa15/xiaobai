var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0) { // harvesting && 背包满
            creep.memory.harvesting = false;  // 变为 非harvesting状态
            creep.say('🏗️ fill');
	    } 
	    if((!creep.memory.harvesting) && creep.store[RESOURCE_ENERGY] == 0) { // 非harvesting状态 && 背包空(空余为0)
	        creep.memory.harvesting = true;  // 变为 harvesting状态
	        creep.say('🔄 harvest');
	    }
        if(creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && creep.memory.harvesting == true){
            var source = creep.room.find(FIND_SOURCES);
            if(creep.harvest(source[Memory.creeps[creep.name].workLoc]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source[Memory.creeps[creep.name].workLoc], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else{
            var targets = creep.room.find(FIND_STRUCTURES, { //找出需要补充能量的建筑
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || 
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        if(targets.length > 0) { // 需要维护的建筑数目 > 0 
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else{
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES); // 寻找建筑位
            if(targets.length) {  // targets.length > 0  || 建筑位 > 0
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}); // 绘制路径
                }
            }
            else {  // 非building状态的时候， 到source旁边并采集
                var source = creep.room.find(FIND_SOURCES);
                if(creep.harvest(source[Memory.creeps[creep.name].workLoc]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source[Memory.creeps[creep.name].workLoc], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        }
	}
};

module.exports = roleHarvester