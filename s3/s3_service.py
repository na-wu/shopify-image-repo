import boto3

from constants import constants

class S3Service:
    
    def __init__(self, bucket_name):
        self.s3_client = boto3.client("s3")
        self.bucket_name = bucket_name
    
    def get_signed_url(self, key):
        return self.s3_client.generate_presigned_url(
            'get_object',
            Params={'Bucket': self.bucket_name,'Key': key}, 
            ExpiresIn=3600
            )
    
    def upload_image(self, key, image):
        self.s3_client.put_object(Bucket=self.bucket_name, Key=key, Body=image)