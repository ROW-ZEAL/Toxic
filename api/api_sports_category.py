import psycopg2
from backend.helper import execute_query_and_map_results

def api_show_sports_category(request):
    Category_results = get_sports_list(request=request)
    return {
        "Category": Category_results,
    }


def get_sports_list(request):
    Category_results = """select * from sports_categories sc ;"""
    return list(execute_query_and_map_results(Category_results))