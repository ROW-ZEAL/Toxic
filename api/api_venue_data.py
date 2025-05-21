import psycopg2
from backend.helper import execute_query_and_map_results

def api_show_venue_list(ownerName):
    venue_results = get_venue_list(ownerName)
    return {"Venue": venue_results}

def get_venue_list(owner_name):
    print('Owner:', owner_name)
    query = """
        SELECT 
            av.id, av.name, av.location, av.capacity, av.type, av.photos
        FROM api_venue av
        JOIN account_user au ON av.owner_id = au.id
        WHERE au.name = %s;
    """
    return list(execute_query_and_map_results(query, (owner_name,)))