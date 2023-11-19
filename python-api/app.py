from fastapi import FastAPI
import requests
import json

import matplotlib.pyplot as plt
import matplotlib.colors as mcolors
import rasterio

from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

import rasterio
import numpy as np

from PIL import Image

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

    return round(carbon_emissions)

@app.get("/heatmap")
async def heatmap():
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


    url = "https://solar.googleapis.com/v1/dataLayers:get"
    params = {
        "location.latitude": lat,
        "location.longitude": lon,
        "radiusMeters": 100,
        "view": "FULL_LAYERS",
        "requiredQuality": "HIGH",
        "pixelSizeMeters": 0.5,
        "key": api_key
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        # Request was successful
        data = response.json()
        print(data)
    else:
        # Request failed
        print(f"Error: {response.status_code}, {response.text}")

    urls_base= ["rgbUrl", "maskUrl", "annualFluxUrl"]
    for url_base in urls_base:
        url_map= data[url_base]
        url_map+= "&key="+api_key
        response = requests.get(url_map)
        if response.status_code == 200:
            # Request was successful
            # Assuming the response is a binary file, you might want to save it
            with open(url_base+".tif", "wb") as f:
                f.write(response.content)
            print("File saved successfully.")
        else:
            # Request failed
            print(f"Error: {response.status_code}, {response.text}")

    geotiff_path = 'rgbUrl.tif'

    # Open the GeoTIFF file
    dataset = rasterio.open(geotiff_path)
    data_r = dataset.read(1)
    data_g = dataset.read(2)
    data_b = dataset.read(3)
    data_rgb = np.dstack((data_r, data_g, data_b))

    geotiff_path = 'maskUrl.tif'
    dataset = rasterio.open(geotiff_path)
    data_mask = dataset.read(1) 
    complement_mask = 1 - data_mask

    broadcasted_complement_mask = np.expand_dims(complement_mask, axis=-1)

    masked_image = data_rgb * broadcasted_complement_mask
    masked_image_norm = masked_image / 255.0

    # Path to your GeoTIFF file
    geotiff_path = 'annualFluxUrl.tif'

    # Open the GeoTIFF file
    dataset = rasterio.open(geotiff_path)
    data_heat = dataset.read(1)
    cmap_hot = plt.get_cmap('hot')
    norm = mcolors.Normalize(vmin=data_heat.min(), vmax=data_heat.max())
    data_hot = cmap_hot(norm(data_heat))
    data_hot= data_hot[:, :, :3]

    geotiff_path = 'maskUrl.tif'
    dataset = rasterio.open(geotiff_path)
    data_mask = dataset.read(1) 

    broadcasted_mask = np.expand_dims(data_mask, axis=-1)
    broadcasted_mask
    data_hot_final = data_hot * broadcasted_mask

    image_final= np.array((masked_image_norm + data_hot_final)*255, dtype=np.uint8)

    pil_image = Image.fromarray(image_final)

    # Save the PIL Image to a file
    pil_image.save('output_image.png')
    return FileResponse('output_image.png')