import time 
import requests
import json
import subprocess 

fifo_pipe = 'signalpipe'
manager_path = './scan_manager.sh'
stop_path = './stop_scan.sh'
count = 0
file = open('monitor.txt', 'w')
array_stations = []
parsed_stations = []
urlsignal = "https://10.42.0.1/api/signals/create/"

is_on_development = False

urlnwid = "https://10.42.0.1/api/networks/get_last_id/"


# def get_nwid(response):
#     if response.status_code == 200:
#         # Extract the JSON data from the response
#         return response.json()
#     else: 
#         return 0

# def get_response():
#     if(is_on_development):
#         nwid_response = get_nwid(requests.get("http://localhost:8000/networks/get_last_id/"))
#         return nwid_response
#     else:
#         nwid_response = get_nwid(requests.get(urlnwid))
#         return nwid
    
# nwid_response = get_nwid(requests.get(urlnwid))
# nwid = nwid_response



def run_script():
    subprocess.call(['sudo', 'sh', manager_path])

def stop_script():
    subprocess.call(['sudo', 'sh', stop_path])

def get_scannings():
    nwid = get_response()
    print("Waiting initialization ...")
    time.sleep(17)
    print("Listening pipe")
    with open(fifo_pipe, 'r') as signals:
        while True: 
            line = signals.readline()
            if not line:
                break
            # array_stations.append(str(line))
            parse_scannings(str(line))

def parse_scannings(line):
    # for j in range (0,len(array_stations)):
    # line = array_stations[j]
    i=-1
    bssid = ""
    station = ""
    pwr = ""
    while i<(len(line)-1) :

        i+=1
        # if (str(line)[i] != " "):
        #     print(str(line)[i])
        if (line[i] == "(" ):
            bssid = "(not associated)"
            i += 15

        if (line[i] == ":" and bssid == ""):
            temp = line[i-2: i+15]
            if (not (" " in temp)):
                bssid = temp
                i += 14
            
        if (line[i] == ":" and station == "" and bssid != ""):
            temp = line[i-2: i+15]
            if ( not (" " in temp)):
                station = temp
                i += 14

        if (line[i] == "-" and (pwr == "")):
            if not (" " in line[i+1] ):
                pwr = line[i: i+3]
                i += 2
                
        if (station != "" and pwr != "" and bssid != ""):
            request_data = { 'network_scan_id': nwid, 'station': station, 'pwr':pwr }
            request = requests.post(urlsignal, json.dumps(request_data))
            print(request_data)
            parsed_stations.append({ 'network_id': nwid, 'station': station, 'pwr':pwr, 'signal_started_at': now.strftime("%d/%m/%YT%H:%M:%S") })
            bssid = ""
            station = ""
            pwr = ""
    # print (parsed_stations)
            
            
            