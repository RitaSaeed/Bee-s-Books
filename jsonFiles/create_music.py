import boto3
dynamodb = boto3.resource('dynamodb', endpoint_url='http://itec-dynamodb.radford.edu:8000/')
###dynamodb = boto3.client('dynamodb', endpoint_url='http://localhost:8000/')
try:
    table = dynamodb.create_table(
        TableName='tcsl_shelter',
        AttributeDefinitions=[
            {
                "AttributeName": "PK",
                "AttributeType": "S" # Partition Key
            },
            {
                "AttributeName": "SK",
                "AttributeType": "S" # Sort Key
            }
        ],
        KeySchema=[
            {
                "AttributeName": "PK",
                "KeyType": "HASH"    # Partition Key
            },
            {
                "AttributeName": "SK",
                "KeyType": "RANGE"   # Sort Key
            }
        ],
        ProvisionedThroughput={
            "ReadCapacityUnits": 1,
            "WriteCapacityUnits": 1
        }
    )
    print("Table created successfully")
except Exception as e:
    print("Could not create table, ERROR:")
    print(e)

table = dynamodb.Table('tcsl_shelter')
caretakers = [
    {
        "PK": "CARETAKER#JohnSmith",
        "SK": "CARETAKER#JohnSmith",
        "PhoneNumber": "(555) 555-5555",
        "StartDate": "2022-01-10",
        "Schedule": {
            "M": {
                "Monday": {"S": "8a-5p"},
                "Wednesday": {"S": "3p-7p"},
                "Friday": {"S": "10a-12p"}
            }
        }
    },
    {
        "PK": "CARETAKER#KellyRowland",
        "SK": "CARETAKER#KellyRowland",
        "PhoneNumber": "(666) 666-6666",
        "StartDate": "2023-12-08",
        "Schedule": {
            "M": {
                "Tuesday": {"S": "9a-4p"},
                "Thursday": {"S": "12p-3p"}
            }
        }
    }

]
animals = [
    {
        "PK": "CARETAKER#JohnSmith",
        "SK": "",
        "Color": "",
        "Weight(lbs)": {"N": ""}
        "Food": "",
        "Breed": "",
        "Gender": "",
        "Age(yr)": {"N": ""}
        "Adopted?": "",
        "ArrivalDate": "",
        "DepartureDate": ""
    },
        {
        "PK": "CARETAKER#JohnSmith",
        "SK": "",
        "Color": "",
        "Weight(lbs)": {"N": ""}
        "Food": "",
        "Breed": "",
        "Gender": "",
        "Age(yr)": {"N": ""}
        "Adopted?": "",
        "ArrivalDate": "",
        "DepartureDate": ""
    },
        {
        "PK": "CARETAKER#JohnSmith",
        "SK": "",
        "Color": "",
        "Weight(lbs)": {"N": ""}
        "Food": "",
        "Breed": "",
        "Gender": "",
        "Age(yr)": {"N": ""}
        "Adopted?": "",
        "ArrivalDate": "",
        "DepartureDate": ""
    },
        {
        "PK": "CARETAKER#JohnSmith",
        "SK": "",
        "Color": "",
        "Weight(lbs)": {"N": ""}
        "Food": "",
        "Breed": "",
        "Gender": "",
        "Age(yr)": {"N": ""}
        "Adopted?": "",
        "ArrivalDate": "",
        "DepartureDate": ""
    }
]
try:
    # Insert caretakers
    for caretaker in caretakers:
        table.put_item(Item=caretaker)
    print("Caretaker inserted successfully.")

    #Insert animals
    for animal in animals:
        table.put_item(Item=animal)
    print("Animal inserted successfully.")
except Exception as e:
    print("Could not insert data, ERROR: ")
    print(e)

