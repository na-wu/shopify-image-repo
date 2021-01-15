import boto3

from constants import constants

class RekognitionService:
    
    def __init__(self):
        self.rekognition_client = boto3.client("rekognition", region_name='us-west-1')
    
    def get_labels(self, bucket, key):
        labels = self.rekognition_client.detect_labels(
            Image={
            "S3Object": {
                "Bucket": bucket,
                "Name": key
            }
        },
        MinConfidence=95.0
        )
        return labels["Labels"]