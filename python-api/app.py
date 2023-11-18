from fastapi import FastAPI
import requests
import json

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#Allow all origins, methods, and headers for demonstration purposes
origins = ["*"]

# Setup CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello_world():
    return {'message':'Hello World'}

@app.get("/restaurants_fixedlocation")
def hello_world():
    api_key= "AIzaSyAHbJM1jo4wyx5whpMNtfnpsHT30MjJ0JA"
    url = "https://www.googleapis.com/geolocation/v1/geolocate?key="+api_key
    headers = {
        "Content-Type": "application/json"
    }
    data = {
        "homeMobileCountryCode": 310,
        "homeMobileNetworkCode": 410,
        "radioType": "gsm",
        "carrier": "Vodafone",
        "considerIp": True
    }

    response = requests.post(url, headers=headers, json=data)

    # Check if the request was successful (status code 200)
    if response.ok:
        result = response.json()
    else:
        print(f"Error: {response.status_code}, {response.text}")

    lat= result['location']['lat']
    lon= result['location']['lng']

    lat= 42.3509568
    lon= -71.1107292

    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        'keyword': 'sustainable veggie',
        'location': f"{lat},{lon}",
        'radius': 1500,
        'type': 'restaurant',
        'key': api_key
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        # The request was successful
        data = response.json()
        # Process the response data as needed
        print("Ok")
    else:
        # There was an error with the request
        print(f"Error: {response.status_code}, {response.text}")

    print(data)
    print(len(data["results"]))

    address= data['results'][0]['vicinity']
    name= data['results'][0]['name']

    result= name + " " + address

    complete= address + name
    swap = complete.replace(" ", "+")
    main_map= f"https://www.google.com/maps/embed/v1/place?key=AIzaSyAHbJM1jo4wyx5whpMNtfnpsHT30MjJ0JA&q={swap}"
    
    results= []

    for i in range(len(data["results"])):
        results.append(data["results"][i]["name"] + " " + data["results"][i]["vicinity"])

    return {'names': results, 'main_map': main_map}

@app.get("/route")
async def hello_world(origin: str, destination: str, mode: str, alternatives: bool):
    api_key= "AIzaSyAHbJM1jo4wyx5whpMNtfnpsHT30MjJ0JA"
    url = 'https://maps.googleapis.com/maps/api/directions/json'
    params = {'origin': origin,
            'destination': destination,
            'mode': mode,
            'alternatives': alternatives,
            'key': api_key}

    response = requests.get(url, params=params)
    data= json.loads(response.content.decode('utf-8'))
    n_route=0
    carbon_emissions=0
    for i in range(len(data['routes'][n_route]["legs"][0]["steps"])):
        distance= (data['routes'][n_route]["legs"][0])["steps"][i]["distance"]["value"]
        travel_mode= (data['routes'][n_route]["legs"][0])["steps"][i]["travel_mode"]

        print("Distance (m):", distance)

        if travel_mode == "TRANSIT":
            travel_mode= (data['routes'][n_route]["legs"][0])["steps"][i]["transit_details"]["line"]["vehicle"]["name"]
            print("Mode:", travel_mode)
        else:
            print("Mode:", travel_mode)

        distance= distance/1000

        if travel_mode == "DRIVING":
            carbon_emissions += distance*180
        elif travel_mode == "Bus":
            carbon_emissions += distance*75
        elif travel_mode == "Train":
            carbon_emissions += distance*15

    return {'carbon_emissions': round(carbon_emissions)}