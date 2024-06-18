from sqlalchemy import Column, Integer, String, DateTime, Float
from database import Base
from sqlalchemy.sql import func
from datetime import datetime
import scan_manager


# NetworkScan contains scanning instances (envelops the instances of LocationScans and SignalScans) 
class NetworkScans(Base):
    __tablename__ = "network_scans"

    id = Column(Integer, primary_key = True, index = True)
    # status = Column(Integer)
    signal_started_at = Column(DateTime) 
    location_started_at = Column(DateTime)   


class SignalScans(Base):
    __tablename__ = "signal_scans"

    id = Column(Integer, primary_key = True, index = True)
    network_scan_id = Column(Integer, index = True)
    station = Column(String)
    pwr = Column(Float)
    signal_started_at = Column(DateTime)


# Location scans contains the location on a certain time of the device.  
class LocationScans(Base):
    __tablename__ = "location_scans"

    id = Column(Integer, primary_key = True, index = True)
    network_scan_id = Column(Integer, index = True)
    x = Column(Float)
    y = Column(Float)
    z = Column(Float)
    location_started_at = Column(DateTime)  

# The stations and their maximum powers per scan
class Stations(Base):
    __tablename__ = "stations"

    id = Column(Integer, primary_key = True, index = True)
    network_scan_id = Column(Integer, index = True)
    station = Column(String)
    pwr = Column(Float)

class Stations(Base):
    __tablename__ = "stations"

    id = Column(Integer, primary_key = True, index = True)
    network_scan_id = Column(Integer, index = True)
    station = Column(String)
    pwr = Column(Float)