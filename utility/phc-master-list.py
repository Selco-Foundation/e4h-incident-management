import pandas as pd
from elasticsearch import Elasticsearch, helpers
import time
import ssl


def push_data_to_es(excel_path, es_host, es_user, es_password, index_name):
    # Read the Excel file
    df = pd.read_excel(excel_path)

    # Strip whitespace from column names
    df.columns = df.columns.str.strip()

    # Remove the degree symbol from latitude and longitude columns
    df['Latitude'] = df['Latitude'].astype(str).str.replace(' ', '').str.replace('°', '').astype(float)
    df['Longitude'] = df['Longitude'].astype(str).str.replace(' ', '').str.replace('°', '').astype(float)

    context = ssl.create_default_context()
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE

    # Initialize Elasticsearch client with authentication
    es = Elasticsearch(
        [es_host],
        http_auth=(es_user, es_password),
        ssl_context=context,
        verify_certs=False  # Since SSL context manages verification
    )

    actions = []
    for _, row in df.iterrows():
        tenant_id = row['Health Care Centre Name'].replace(" ", "")

        action = {
            "_index": index_name,
            "_id": tenant_id,  # Set the document ID to tenant_id
            "_source": {
                "Data": {
                    "block": row['Block'],  # Adjust column name if necessary
                    "code": row['NIN (username)'],
                    "district": row['District'],  # Adjust column name if necessary
                    "geo-point": [row['Longitude'], row['Latitude']],  # Directly store latitude and longitude as array
                    "isLive": False,  # Assuming all records are live, adjust as needed
                    "name": row['Name'],
                    "phcType": row['Name'],
                    "tenantId": tenant_id,
                    "type": row['Type of HC']
                }
            }
        }
        actions.append(action)

    # Bulk push to Elasticsearch
    helpers.bulk(es, actions)


if __name__ == "__main__":
    # Collect input from the user
    excel_path = input("Enter the path to the Excel file: ")
    es_host = input("Enter the ES Host: ")
    es_user = input("Enter the username: ")
    es_password = input("Enter the password: ")
    index_name = input("Enter the index: ")

    push_data_to_es(excel_path, es_host, es_user, es_password, index_name)
