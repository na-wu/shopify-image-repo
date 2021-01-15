import boto3
import uuid
import json
import urllib3

from botocore.vendored import requests
from constants import constants

class ElasticSearchService:
    
    def __init__(self, domain):
        self.domain = domain
        self.http = urllib3.PoolManager()
        self.search_uri = self.domain + "/_search"
        self.basic_auth = f"{constants.USERNAME}:{constants.PASSWORD}"
    
    def add_labels_to_domain(self, labels, key):
        headers = { "Content-Type": "application/json"}
        headers.update(urllib3.make_headers(basic_auth=self.basic_auth))
        
        for label in labels:
            data = {
                label["Name"].upper(): key
            }
            try:
                self.http.request(
                    'POST',
                    self.domain,
                    body = json.dumps(data),
                    headers = headers,
                    retries = False
                    )
            except Exception as e:
                print(e)

    def get_labels_from_domain(self, tag):
        headers = { "Content-Type": "application/json"}
        headers.update(urllib3.make_headers(basic_auth=self.basic_auth))
        query = {
            "size": 25,
            "query": {
                "query_string": {
                  "default_field": tag,
                  "query": "images"
                }
            }
        }
        response = self.http.request(
            'GET',
            self.search_uri,
            body = json.dumps(query),
            headers=headers,
            retries=False
            )
        return json.loads(response.data.decode("utf-8"))

    
        