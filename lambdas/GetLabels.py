import json
import boto3

from db.ddb_service import DDBService
from constants import constants

def lambda_handler(event, context):
    
    ddb = DDBService(constants.DDB_TABLE_NAME)
    labels = ddb.get_all_labels()
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps(labels)
    }
