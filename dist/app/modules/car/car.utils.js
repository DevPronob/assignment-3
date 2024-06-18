"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const totalCost = (starTime, endTime, pricePerHour) => {
    function convertTimeToHour(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    }
    const startHours = convertTimeToHour(starTime);
    const endHours = convertTimeToHour(endTime);
    const duration = endHours - startHours;
    // if (duration < 0) {
    //     duration += 24;
    // }
    const totalCost = duration * pricePerHour;
    console.log(totalCost);
    return totalCost;
};
exports.default = totalCost;
