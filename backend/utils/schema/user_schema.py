user_schema = {
    'title': 'A Brownerr User',
    'description': "Schema for Brownerr user fields",
    'type': 'object',
    'properties': {
        'user_id': {
            'description': 'Unique identifier for the user',
            'type': 'string'},
        'name': {'type': 'string'},
        'year': {'type': 'number'},
        'service_provider': {
            'description': 'indicates whether user provides services', 
            'type': 'boolean'},
    },
    'required': ['user_id', 'name', 'service_provider']
}
