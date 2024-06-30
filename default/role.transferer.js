var roleTransferer = {  

    /** @param {Creep} creep **/  
    run: function(creep) {  

        if(creep.memory.transfering && creep.store[RESOURCE_ENERGY] == 0) { // 转移中 && 背包为空  
            creep.memory.transfering = false; // 变为 非转移状态  
            creep.say('😃下班了！好耶');  
        }  
        if(!creep.memory.transfering && creep.store.getFreeCapacity() == 0) { // 非转移状态 && 背包满(空余为0)  
            creep.memory.transfering = true; // 变为 转移状态  
            creep.say('😟上班了！呜呜呜');  
        }  

        if(!creep.memory.transfering){  
            var targets = creep.room.find(FIND_STRUCTURES, {  
                filter: (structure) => {  
                    return (structure.structureType == STRUCTURE_CONTAINER &&  
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);  
                }  
            });  

            if(targets.length > 0){  
                // 使用creep.memory.workLoc（如果存在）作为索引，否则使用第一个Container  
                var sourceIndex = creep.memory.workLoc || 0;  
                if(sourceIndex >= targets.length) sourceIndex = 0; // 确保索引在范围内  
                var source = targets[sourceIndex];  

                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){  
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffffff'}});  
                }  
            }  
        }  
        else{  
            var targets = creep.room.find(FIND_STRUCTURES, {  
                filter: (structure) => {  
                    return (structure.structureType == STRUCTURE_EXTENSION ||  
                            structure.structureType == STRUCTURE_SPAWN) &&  
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;  
                }  
            });  

            if(targets.length > 0) {  
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {  
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});  
                }  
            }  
            else{  
                // 如果没有可转移的Extension或Spawn，可以考虑转移到其他结构，比如Tower  
                var towerTargets = creep.room.find(FIND_STRUCTURES, {  
                    filter: (structure) => {  
                        return (structure.structureType == STRUCTURE_TOWER &&  
                                structure.energy < structure.energyCapacity);  
                    }  
                });  

                if(towerTargets.length > 0) {  
                    if(creep.transfer(towerTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {  
                        creep.moveTo(towerTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});  
                    }  
                }  
            }  
        }  
    }  
};  

module.exports = roleTransferer;