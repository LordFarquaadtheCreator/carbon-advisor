export function calculateEmission(milesTraveled, mode) {
    let co2EmissionsKg;
    milesTraveled = parseInt(milesTraveled.replace(" mi", ""), 10);
    // console.log(milesTraveled,mode);

    if (mode === 'DRIVING') {
        const avgFuelEfficiencyMpg = 25;
        const milesToKilometers = 1.60934;
        const emissionFactorGasoline = 2.31;
        const fuelEfficiencyLPer100km = 235.2 / avgFuelEfficiencyMpg;
        const fuelUsedLiters = (milesTraveled * milesToKilometers) / (fuelEfficiencyLPer100km / 100);
        co2EmissionsKg = fuelUsedLiters * emissionFactorGasoline;
    } else if (mode === 'TRANSIT') {
        const milesToKilometers = 1.60934;
        const gallonsToLiters = 3.78541;
        const emissionFactorDiesel = 2.68;
        const fuelEfficiencyLPer100km = 235.2 / 6; // Assuming fuel efficiency is 6 gallons per 100 miles for transit
        const fuelUsedLiters = (milesTraveled * milesToKilometers) / (fuelEfficiencyLPer100km / 100);
        co2EmissionsKg = fuelUsedLiters * emissionFactorDiesel;
    } else if (mode === 'WALKING') {
        const avgCaloriesPerMile = 75;
        const carbonFootprintPer1000Calories = 3;
        const totalCaloriesBurned = milesTraveled * avgCaloriesPerMile;
        co2EmissionsKg = (totalCaloriesBurned / 1000) * carbonFootprintPer1000Calories;
    } else { // assuming the mode is 'biking'
        const avgCaloriesPerMile = 45;
        const carbonFootprintPer1000Calories = 3;
        const totalCaloriesBurned = milesTraveled * avgCaloriesPerMile;
        co2EmissionsKg = (totalCaloriesBurned / 1000) * carbonFootprintPer1000Calories;
    }
// console.log(co2EmissionsKg)
    return Math.round(co2EmissionsKg);
}
