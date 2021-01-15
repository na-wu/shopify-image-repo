import json
import boto3
import uuid
import base64

from rekognition.rekognition_service import RekognitionService
from db.elasticsearch_service import ElasticSearchService
from db.ddb_service import DDBService
from s3.s3_service import S3Service
from constants import constants

def get_base64_image(event):
    data = json.loads(event['body'])
    image = data['file']
    image = image[image.find(",")+1:]
    dec = base64.b64decode(image + "===")
    return dec
    
def lambda_handler(event, context):

    rekognition = RekognitionService()
    es = ElasticSearchService(constants.URL)
    s3 = S3Service(constants.BUCKET_NAME)
    ddb = DDBService(constants.DDB_TABLE_NAME)
    
    key = "images/" + str(uuid.uuid4()) + ".jpg"
    
    image = get_base64_image(event)
    
    s3.upload_image(key, image)
    labels = rekognition.get_labels(constants.BUCKET_NAME, key)
    es.add_labels_to_domain(labels, key)
    
    for label in labels:
        ddb.add_label(label)
    
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps("Success")
    }
