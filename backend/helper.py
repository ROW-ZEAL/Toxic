from django.db import connections


def execute_query(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    if not cursor:
        cursor = connections[database].cursor()
    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args)
    return cursor


# execute query and then map the results to col_names
def execute_query_and_map_results(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    if not cursor:
        cursor = connections[database].cursor()

    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args)

    col_names = [desc[0] for desc in cursor.description]

    while True:
        row = cursor.fetchone()
        if row is None:
            break
        dict_row = dict(zip(col_names, row))
        yield dict_row
    return


def execute_query_fetch_all(query_string, *query_args, database='default', cursor=None, **query_kwargs):
    if not cursor:
        cursor = connections[database].cursor()

    if query_kwargs:
        cursor.execute(query_string, query_kwargs)
    else:
        cursor.execute(query_string, query_args)

    return cursor.fetchall()
