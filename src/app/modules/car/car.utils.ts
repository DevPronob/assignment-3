
const totalCost = (starTime?: string, endTime?: string, pricePerHour?: number) => {
    function convertTimeToHour(time: any) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    }

    const startHours = convertTimeToHour(starTime);
    const endHours = convertTimeToHour(endTime);
    let duration = endHours - startHours;
    // if (duration < 0) {
    //     duration += 24;
    // }
    const totalCost = duration * pricePerHour;
    console.log(totalCost)
    return totalCost
}
export default totalCost