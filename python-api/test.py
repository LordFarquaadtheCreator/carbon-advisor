import os
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from a .env fil
GOOGLEAPIKEY = os.environ.get('GOOGLEAPIKEY')

print(GOOGLEAPIKEY)