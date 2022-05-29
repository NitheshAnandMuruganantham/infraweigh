import json
import cv2
import os
import base64
from flask import Flask, jsonify, request


def capture(url):
    os.environ['OPENCV_FFMPEG_CAPTURE_OPTIONS'] = 'rtsp_transport;udp'
    cap = cv2.VideoCapture(url, cv2.CAP_FFMPEG)
    retval, image = cap.read()
    scaledDown = cv2.resize(image, (300, 300))
    retval, buffer = cv2.imencode('.jpeg', scaledDown)
    ConvertedBase64Image = base64.b64encode(buffer)
    cap.release()
    return ConvertedBase64Image.decode('utf-8')


app = Flask(__name__)


@app.route('/', methods=["POST"])
def get_bill_data():
    data = request.get_json()
    img1 = capture(data['camera'][0])
    img2 = capture(data['camera'][1])
    img3 = capture(data['camera'][2])
    img4 = capture(data['camera'][3])
    return jsonify({'image': [img1, img2, img3, img4]})


if __name__ == '__main__':
    app.run(port=9998)
