from flask import Flask, request, jsonify, render_template
from events import gameStarted
cmdapp = Flask(__name__)

@cmdapp.route('/')
def home():
    return render_template('index.html')

@cmdapp.route('/gameStarted', methods=['POST'])
def run_python():
    data = request.json  # if you're sending JSON
    # do something with data if needed
    print("Python function was called!")
    gameStarted()
    return jsonify({'message': 'Python function executed successfully!'})

if __name__ == '__main__':
    cmdapp.run(debug=True)
