const setPilot = async (newPilot, spaceship) => {
    spaceship.pilot = newPilot;
};
const accelerate = async (targetSpeed, spaceship) => {
    spaceship.speed = targetSpeed;
};
const sendToMission = async (spaceship) => {
    spaceship.inMission = true;
};
const spaceship = {
    name: '',
    pilot: '',
    speed: 0,
    inMission: false,
};
const pilot = "Han Solo";
spaceship.name = "Millennium Falcon";
setPilot(pilot, spaceship);
accelerate(50, spaceship);
sendToMission(spaceship);
console.log(spaceship);
