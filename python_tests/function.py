def calculate_emission (miles_traveled, mode):
    if(mode=='car'):
        avg_fuel_efficiency_mpg = 25
        miles_to_kilometers = 1.60934

        # Emission factor for gasoline in kg CO2 per liter
        emission_factor_gasoline = 2.31

        # Convert fuel efficiency to L/100km
        fuel_efficiency_l_per_100km = 235.2 / avg_fuel_efficiency_mpg

        # Calculate the amount of fuel used in liters
        fuel_used_liters = (miles_traveled * miles_to_kilometers) / (fuel_efficiency_l_per_100km / 100)

        # Calculate CO2 emissions
        co2_emissions_kg = fuel_used_liters * emission_factor_gasoline

        return int(co2_emissions_kg)
    elif(mode=='transit'):
        miles_to_kilometers = 1.60934
        gallons_to_liters = 3.78541
        emission_factor_diesel = 2.68

        fuel_efficiency_l_per_100km = 235.2 / 6 #fuel efficiency is 6 
        fuel_used_liters = (miles_traveled * miles_to_kilometers) / (fuel_efficiency_l_per_100km / 100)

        # Calculate CO2 emissions
        co2_emissions_kg = fuel_used_liters * emission_factor_diesel

        return int(co2_emissions_kg)
    elif(mode=='walking'):
        avg_calories_per_mile = 75

        # Carbon footprint per 1,000 calories (in kg CO2)
        # This is an average value and can vary based on diet
        carbon_footprint_per_1000_calories = 3

        # Calculate total calories burned
        total_calories_burned = miles_traveled * avg_calories_per_mile

        # Calculate CO2 emissions
        co2_emissions_kg = (total_calories_burned / 1000) * carbon_footprint_per_1000_calories

        return int(co2_emissions_kg)
    else: #biking
        avg_calories_per_mile = 45  # This is an average and can vary

        # Carbon footprint per 1,000 calories (in kg CO2)
        carbon_footprint_per_1000_calories = 3

        # Calculate total calories burned
        total_calories_burned = miles_traveled * avg_calories_per_mile

        # Calculate CO2 emissions
        co2_emissions_kg = (total_calories_burned / 1000) * carbon_footprint_per_1000_calories

        return int(co2_emissions_kg)