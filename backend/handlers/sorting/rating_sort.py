import json


def sort_provider(data):
    sorted_data = sorted(data, key=lambda x: x['rating_provider'], reverse=True)
    return sorted_data


def sort_recipient(data):
    sorted_data = sorted(data, key=lambda x: x['rating_recipient'], reverse=True)
    return json.dumps(sorted_data)
