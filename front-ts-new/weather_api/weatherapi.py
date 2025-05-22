import requests

API_KEY = ""
LOCATION = "Gandhinagar"
URL = f"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={LOCATION}"

response = requests.get(URL)
data = response.json()

print(data)
