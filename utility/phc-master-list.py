import pandas as pd
from elasticsearch import Elasticsearch, helpers
import time
import ssl

# Read the Excel file
excel_path = '/home/admin1/elastic-security/Pilot Phase 1 - centers.xlsx'  # Update this path to the actual path of your Excel file
df = pd.read_excel(excel_path)

# Print column names to identify the exact names
print(df.columns)

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
    ["https://localhost:9200"],  # Update with your Elasticsearch server details
    http_auth=("elastic", "8fwbD6HbJh6HU0oddsHm8TEI"),
    ssl_context=context,
    verify_certs=False  # Since SSL context manages verification
)

# Function to transform and push data to Elasticsearch
def push_data_to_es(df):
    actions = []
    for _, row in df.iterrows():
        tenant_id = "pg." + row['Health Care Centre Name'].replace(" ", "")

        action = {
            "_index": "phc-master-list-copy",
            "_id": tenant_id,  # Set the document ID to tenant_id
            "_source": {
                "Data": {
                    "accountCreationTime": int(time.time() * 1000),  # Current timestamp in milliseconds
                    "block": row['Block'],  # Adjust column name if necessary
                    "code": row['NIN (username)'],
                    "district": row['District'],  # Adjust column name if necessary
                    "geo-point": [row['Longitude'], row['Latitude']],  # Directly store latitude and longitude as array
                    "isLive": False,  # Assuming all records are live, adjust as needed
                    "name": row['Health Care Centre Name'],
                    "phcType" : row['Health Care Centre Name'],
                    "tenantId": tenant_id,
                    "type": row['Type of HC']
                }
            }
        }
        actions.append(action)

    # Bulk push to Elasticsearch
    helpers.bulk(es, actions)

# Call the function to push data
push_data_to_es(df)
