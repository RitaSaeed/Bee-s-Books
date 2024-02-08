import boto3
import json
dynamodb = boto3.resource('dynamodb')

table = dynamodb.Table('Product-Order-Table')

with open("memoir.json", "r") as file:
    books = json.load(file)


#with open("memoir2.json", "r") as file:
#    books2 = json.load(file)

#books.update(books2)
# all_books = {**books, **books2}


try:
    # Insert caretakers
    for book in books:
        table.put_item(Item=book)
    print("Book inserted successfully.")


except Exception as e:
    print("Could not insert data, ERROR: ")
    print(e)

