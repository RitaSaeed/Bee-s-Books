import boto3
import json
import sys
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('Product-Order-Table')

filename = sys.argv[1]

try:

    with open(filename, 'r') as json_file:
        books = json.load(json_file)

    with table.batch_writer() as batch:
        for book in books["books"]:
            batch.put_item(Item=book)


except Exception as e:
    print("Could not insert data, ERROR: ")
    print(e)

