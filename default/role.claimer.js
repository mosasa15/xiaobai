var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // 要占领房间的 creep
const creep = Game.creeps['claimer1']
// 要占领的房间
const room = Game.rooms['E55n18']
// 如果该房间不存在就先往房间走
if (!room) {
    creep.moveTo(new RoomPosition(25, 25, 'E55N18'))
}
else {
    // 如果房间存在了就说明已经进入了该房间
    // 移动到房间的控制器并占领
    if (creep.claimController(room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(room.controller)
    }
}
    }
}

module.exports = roleClaimer;
