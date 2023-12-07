import json
import random

# Customize these variables according to your requirements
vertical_names = ["Water Quality", "Air Quality", "Smart Room"]
node_count_per_vertical = 5
node_types = {
    "Water Quality": {
        "WQ-VJS-V1": ["AQI", "WQI", "Density", "Pressure"],
        "WQ-SCRC-V1": ["AQI", "WQI", "Density", "Pressure", "Flow"],
    },
    "Air Quality": {"AQ-XYZ-V1": ["PM2.5", "PM10", "CO2 Levels", "Temperature"]},
    "Smart Room": {"SR-ABC-V1": ["Temperature", "Humidity", "Light", "Occupancy"]},
}


def generate_node_name(vertical_name, index):
    return f"AE-{vertical_name.split()[0][:2]}{index}"


def generate_data(data_types, count):
    data = []
    for i in range(count):
        # generate random data for each data type
        temp_data = {}
        for data_type in data_types:
            temp_data[data_type] = random.randint(0, 100)
        data.append(temp_data)
    return data


def generate_vertical_structure(vertical_name):
    vertical_structure = {
        "name": vertical_name,
        "nodeTypes": node_types[vertical_name],
        "nodes": [],
    }

    for i in range(1, node_count_per_vertical + 1):
        node_name = generate_node_name(vertical_name, i)
        node_type = random.choice(list(node_types[vertical_name].keys()))
        vertical_structure["nodes"].append(
            {
                "nodeName": node_name,
                "nodeType": node_type,
                "data": generate_data(vertical_structure["nodeTypes"][node_type], 10),
                "subscriptions": [],
            }
        )

    return vertical_structure


def main():
    verticals = [generate_vertical_structure(vertical) for vertical in vertical_names]
    complete_structure = {"verticals": verticals}

    # Save to JSON file
    with open("output.json", "w") as json_file:
        json.dump(complete_structure, json_file, indent=4)

    print("JSON structure generated and saved to output.json")


if __name__ == "__main__":
    main()
