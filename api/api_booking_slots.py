import psycopg2
from backend.helper import execute_query_and_map_results

def filter_venue_details(venueid):
    booking_result = get_venue_details_with_filters(venueid)
    return {"Venue": booking_result}

def get_venue_details_with_filters(venueid):
    print('Venue to search:', venueid)
    query = """
        SELECT
            av.id AS venue_id,
            av."location",
            av."name",
            av.capacity,
            av."type",
            av.status,
            av.price,
            av.description,
            av.facilities,
            av.sport_categories,
            av.photos,
            vs.venue_name,
            vs.venue_image,
            vs.schedule_date,
            vs.start_time,
            vs.end_time,
            vs.available,
            vs.color
        FROM
            venue_slots vs
        JOIN api_venue av ON
            vs.venue_name = av."name"
        WHERE av.id = %s;
    """
    result = list(execute_query_and_map_results(query, (venueid,)))
    return result
