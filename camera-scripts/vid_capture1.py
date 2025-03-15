import numpy as np
import cv2 as cv
import requests
import json

cap = cv.VideoCapture(0)

#print(model.summary())

labels = ["beans", "cereal", "chips", "milk", "water"]
hm = {}

def get_images_path(product):
    return './dataset/images' + product

inStock = False

aisleNumber = 1

storeId = "store0"

current_product = None

i = 0
while True:
    ret, frame = cap.read()

    if frame.size != 0:
        encodedFrame = cv.imencode(".jpg", frame)[1].tostring()
        headers = {'Content-Type': 'application/octet-stream', 'Prediction-Key': '4e0101961288441b8673cb8aceb387c3'}

        response = requests.post("https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/5d5e2fd1-2492-4374-bce8-58a3b1c4617b/classify/iterations/Iteration1/image", headers=headers, params="", data=encodedFrame)
        json_response = response.json()

        if i > 20 and current_product:
            print("out")
            apiKey = 'wUjrBtp1G8XtVxhYcgu25ol7J5i7y7ytOFnLuqIHUaAygK37DMI3VRLHQ8u0O9pz'
            headers = {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': apiKey
            }
            response = requests.post("https://data.mongodb-api.com/app/data-vehyh/endpoint/data/v1/action/findOne", headers=headers, data=json.dumps({
                "dataSource": "Cluster0",
                "database": "store-info",
                "collection": "products",
                "filter": {"storeId": "store0"}
            }))

            data = response.json()

            data["document"]["products"][current_product]["inStock"] = False
            data["document"]["products"][current_product]["aisle"] = None
            del data["document"]["_id"]

            requests.post("https://data.mongodb-api.com/app/data-vehyh/endpoint/data/v1/action/replaceOne", headers=headers, data=json.dumps({
                "dataSource": "Cluster0",
                "database": "store-info",
                "collection": "products",
                "filter": {"storeId": "store0"},
                "replacement": data["document"]
            }))


            current_product = None
            inStock = False


        for prediction in json_response["predictions"]:
            hm[prediction["tagName"]] = prediction["probability"]
            if prediction["probability"] > .6:
                i = 0
                if current_product and current_product != prediction["tagName"]:
                    i = 100
                    print(i)
                if not current_product:
                    current_product = prediction["tagName"]
                    print(current_product + ": " + str(prediction["probability"]))
                    if not inStock:
                        inStock = True
                        apiKey = 'wUjrBtp1G8XtVxhYcgu25ol7J5i7y7ytOFnLuqIHUaAygK37DMI3VRLHQ8u0O9pz'
                        headers = {
                            'Content-Type': 'application/json',
                            'Access-Control-Request-Headers': '*',
                            'api-key': apiKey
                        }
                        response = requests.post("https://data.mongodb-api.com/app/data-vehyh/endpoint/data/v1/action/findOne", headers=headers, data=json.dumps({
                            "dataSource": "Cluster0",
                            "database": "store-info",
                            "collection": "products",
                            "filter": {"storeId": "store0"}
                        }))

                        data = response.json()

                        data["document"]["products"][current_product]["inStock"] = True
                        data["document"]["products"][current_product]["aisle"] = aisleNumber
                        del data["document"]["_id"]

                        response = requests.post("https://data.mongodb-api.com/app/data-vehyh/endpoint/data/v1/action/replaceOne", headers=headers, data=json.dumps({
                            "dataSource": "Cluster0",
                            "database": "store-info",
                            "collection": "products",
                            "filter": {"storeId": "store0"},
                            "replacement": data["document"]
                        }))

                        print(response.json())


            else:
                i += 1 # loop timer...
        
        # print(hm)

        cv.putText(frame, current_product + " is in stock" if current_product else "Nothing in stock", (50, 50), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255) if not inStock else (0, 255, 0), 2, cv.LINE_AA)
        cv.imshow('Device #1', frame)

    if cv.waitKey(1) == ord('q'):
        break

cap.release()
cv.detroyAllWindows()
