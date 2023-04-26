import json

def sort(data):
    sorted_data = sorted(data, key=lambda x: x['rating'], reverse=True)
    return json.dumps(sorted_data)