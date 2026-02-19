
#define USE_ARDUINO_INTERRUPTS true    // Set-up low-level interrupts for most acurate BPM math.
#include <PulseSensorPlayground.h>     // Includes the PulseSensorPlayground Library.   

#include <SoftwareSerial.h> // Library for connecting Arduino and NodeMCU separate Serial Monitors
#include <ArduinoJson.h> // Library used to send data as an object

const int PulseWire = 0;       // PulseSensor Signal Pin connected to Analog Pin A0

int Threshold = 520; // Threshold Sensitivity for Pulse Sensor

int myBPM = 0; // Initialise value to 0
       
PulseSensorPlayground pulseSensor;  // Creates an object/instance of the PulseSensorPlayground object called "pulseSensor"

SoftwareSerial nodemcu(5, 6); // 5 for Rx (Receive) & 6 for Tx (Transmit/Send)

void setup() {   

  Serial.begin(9600);          // For Serial Monitor
  nodemcu.begin(9600);         //For Connected Serial Monitor

  // Configure the PulseSensor object, by assigning our variables to it. 
  pulseSensor.analogInput(PulseWire);   
  pulseSensor.setThreshold(Threshold);   

  // Double-check the "pulseSensor" object was created and "began" seeing a signal. 
   if (pulseSensor.begin()) {
    Serial.println("We created a pulseSensor Object !");  //This prints one time at Arduino power-up,  or on Arduino reset.  
  }
}



void loop() {

  StaticJsonBuffer<1000> jsonBuffer; 
  JsonObject& data = jsonBuffer.createObject(); // create object named data, which will hold bpm

  if (pulseSensor.sawStartOfBeat()) { // If valid beat is received 
    myBPM = pulseSensor.getBeatsPerMinute(); // get bpm value
    
    data["bpm"] = myBPM; // store myBPM value in attribute named "bpm" in data object, which will be sent to NodeMCU
    data.printTo(nodemcu);
    
    jsonBuffer.clear(); // clear the object, so that new bpm can be recorded
    Serial.println(myBPM);
  }      
  
  delay(1000); // delay time in milliseconds. 1000 ms = 1 sec                   

}

  
