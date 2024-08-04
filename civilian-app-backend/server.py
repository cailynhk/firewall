from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
# MongoDB connection URI
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client['users']  # Database name
collection = db['admin']  # Collection name

@app.route('/add-fire', methods=['POST'])
def add_admin():
    data = request.json
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    download_url = data.get('download_url')
    print(latitude)
    print(longitude)
    if not latitude or not longitude or not download_url:
        return jsonify({'error': 'Missing required fields'}), 400

    new_admin = {
        'latitude': latitude,
        'longitude': longitude,
        'download_url': download_url
    }
    print(new_admin)
    
    result = collection.insert_one(new_admin)
    return jsonify({'message': 'Admin added', 'id': str(result.inserted_id)}), 201

@app.route('/fires', methods=['GET'])
def get_admins():
    admins = list(collection.find({}, {'_id': 0}))
    return jsonify(admins), 200

if __name__ == '__main__':
    app.run(debug=True)
