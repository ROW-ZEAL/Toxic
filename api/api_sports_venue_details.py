import psycopg2
from backend.helper import execute_query_and_map_results

def api_show_venue_detail(ownerName):
    venue_results = get_details(ownerName)
    print("Fetched Venue Results:", venue_results)  # Print the results here
    return {"Venue": venue_results}

def get_details(VenueName):
    print('Name:', VenueName)
    query = """
        SELECT * FROM api_venue av WHERE sport_categories @> %s::jsonb;
    """
    results = list(execute_query_and_map_results(query, (f'["{VenueName}"]',)))
    print("Query Results:", results)
    return results

