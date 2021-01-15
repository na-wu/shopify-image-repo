import boto3

from constants import constants

class DDBService:
    
    def __init__(self, table_name):
        self.ddb_client = boto3.client("dynamodb")
        self.ddb_table_name = table_name
    
    def add_label(self, label):
        # Serialize labels to all uppercase
        # Queries will also follow the same convention
        item = label["Name"].upper()
        try:
            self.ddb_client.put_item(
                TableName=self.ddb_table_name,
                Item={"id": {"S" : item}},
                ConditionExpression="attribute_not_exists(id)"
                )
        except Exception as e:
            # Ignore the ConditionalCheckFailedException, bubble up
            # other exceptions.
            if e.response['Error']['Code'] != 'ConditionalCheckFailedException':
                raise
    
    def get_all_labels(self):
        labels = self.ddb_client.scan(
            TableName=self.ddb_table_name
        )
        labels = [label["id"]["S"] for label in labels["Items"]]
        response = {
            "labels": labels,
            "count": len(labels)
        }

        return response