import json

from db.elasticsearch_service import ElasticSearchService
from s3.s3_service import S3Service
from constants import constants

def lambda_handler(event, context):
    query_param = event["queryStringParameters"]["q"]
    es = ElasticSearchService(constants.URL)
    s3 = S3Service(constants.BUCKET_NAME)
    
    s3_urls = es.get_labels_from_domain(query_param)
    labels = [
        s3.get_signed_url(urls["_source"][query_param]) 
        for urls in s3_urls["hits"]["hits"]
        ]

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps(labels)
    }
