import time 
import requests
import json
import subprocess 
from datetime import datetime

fifo_pipe = 'signalpipe'
manager_path = './scan_manager.sh'
stop_path = './stop_scan.sh'
file = open('monitor.txt', 'w')
stations_pwr = []
parsed_stations = []
current_request_data = ''
urlsignal = "https://10.42.0.1/api/signals/create/"
urlstations = "https://10.42.0.1/api/stations/create/"
urlfirstsignal = "https://10.42.0.1/api/first_signal_scan"
urlcurrentsignal = "https://10.42.0.1/api/signals/current_signal"

is_empty = True
now = datetime.now()
is_first_scan = True
first_signal_started_at = ""
finished = False
urlnwid = "https://10.42.0.1/api/networks/get_last_id/"

def get_res(response):
    if response.status_code == 200:
        # Extract the JSON data from the response
        return response.json()
    else: 
        return 0

# def get_nwid():
#     if(is_on_development):
#         nwid_response = get_res(requests.get("http://localhost:8000/networks/get_last_id/"))
#         return nwid_response
#     else:
#         nwid_response = get_res(requests.get(urlnwid))
#         return nwid_response
    
nwid_response = get_res(requests.get(urlnwid))
nwid = nwid_response

# def get_first_signal_time():
#     return first_signal_started_at

def run_script(id):
    if (id == 0):
        is_first_scan = True
    if (id == 1):
        is_first_scan = False
    subprocess.call(['sudo', 'sh', manager_path])


def stop_script():
    subprocess.call(['sudo', 'sh', stop_path])
    if (is_first_scan):
        finished = True


def get_request_data():
    requests.post(urlcurrentsignal, json.dumps(current_request_data))





    



def get_scannings():
    # nwid = get_response()
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
        global is_empty
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
            signal_started_at = now.strftime("%Y-%m-%dT%H:%M:%S")
            
            if(is_first_scan):
                found = False
                response_station_data = {"network_scan_id": nwid+1, "station": station, "pwr": pwr}
                for elem in stations_pwr:
                    if (station  == elem['station']):
                        found = True
                        if (pwr  > elem['pwr']):
                            elem['pwr'] = pwr
                            requests.post('https://10.42.0.1/api/stations/replace/'+station, json.dumps(response_station_data))
                            print("response found", response_station_data)
                if not found:
                    #se ingresa a la bd
                    requests.post(urlstations, json.dumps(response_station_data))
                    print("response not found", response_station_data)
                    stations_pwr.append({"network_scan_id": nwid+1, "station": station, "pwr": pwr})
                # if finished:
                #     for i in stations_pwr:
                #         print(stations_pwr)
                #         requests.post(urlstations, json.dumps(i))
                
            if(not is_first_scan):
                request_data = { 'network_scan_id': nwid+1, 'station': station, 'pwr':pwr, 'signal_started_at': signal_started_at }
                request = requests.post(urlcurrentsignal, json.dumps(request_data))
                print(request_data)
                        
            if(is_empty):
                # print(signal_started_at)
                response = requests.post(urlfirstsignal, data = signal_started_at)
                print (response.json())
                is_empty = False

            bssid = ""
            station = ""
            pwr = ""
    # print (parsed_stations)
            
            
            