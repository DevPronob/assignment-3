
const totalCost = (starTime?: string, endTime?: string, pricePerHour?: number) => {
    function convertTimeToHour(time: string) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    }

    const startHours = convertTimeToHour(starTime as string);
    const endHours = convertTimeToHour(endTime as string);
    const duration = endHours - startHours;
    // if (duration < 0) {
    //     duration += 24;
    // }
    const totalCost = duration * (pricePerHour as number);
    console.log(totalCost)
    return totalCost
}
export default totalCost