import json

input_filename = "questions"
output_filename = "src/questionPairs.json"
questions = []

with open(input_filename, "r") as input_file:
    lines = input_file.readlines()
    for i in range(0, len(lines), 3):
        q1 = lines[i].strip()
        q2 = lines[i+1].strip()
        questions.append([q1, q2])

with open(output_filename, "w") as output_file:
    json.dump(questions, output_file)