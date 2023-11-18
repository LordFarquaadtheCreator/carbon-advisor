from fastapi import FastAPI
import requests


app = FastAPI()

@app.get("/")
def hello_world():
    return {'message':'Hello World'}

@app.get("/restaurants")
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

    address= data['results'][0]['vicinity']
    name= data['results'][0]['name']

    complete= address + name
    swap = complete.replace(" ", "+")
    main_map= f"https://www.google.com/maps/embed/v1/place?key=AIzaSyAHbJM1jo4wyx5whpMNtfnpsHT30MjJ0JA&q={swap}"
    
    names= []
    addresses= []
    for i in range(len(data["results"])):
        names.append(data["results"][i]["name"])
        addresses.append(data["results"][i]["vicinity"])

    return {'names': names, 'addresses': addresses, 'main_map': main_map}