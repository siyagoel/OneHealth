import requests

# Define your bot's token and the channel ID where you want to create the invite
BOT_TOKEN = "MTE1Mjg5Nzk0NDAxMDM2NzA2Ng.G28Ux4.9lfbpfoNRVC7CCnTi8-NatVEGsvMIhmdt8fN3I"

# Replace 'YOUR_GUILD_ID' with the ID of the server (guild) where you want to create the channel
GUILD_ID = '1152897247915282514'

# Construct the API URL for creating a channel in the specified guild
API_URL = f'https://discord.com/api/v10/guilds/{GUILD_ID}/channels'

# Set up request headers
headers = {
    'Authorization': f'Bot {BOT_TOKEN}',
    'Content-Type': 'application/json'
}

# Define the data for creating the text channel
channel_data = {
    'name': 'cool-channel',  # Replace with your desired channel name
    'type': 0  # 0 represents a text channel
}

# Send the POST request to create the channel
response = requests.post(API_URL, headers=headers, json=channel_data)

# Handle the response
if response.status_code == 201:
    print('Channel created successfully!')
    channel_info = response.json()
    print(f'Channel ID: {channel_info["id"]}')
else:
    print('Failed to create channel. Status code:', response.status_code)
    print('Response:', response.text)



