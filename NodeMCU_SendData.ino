
#define USE_ARDUINO_INTERRUPTS true

#include <ESP8266WiFi.h> // Library for the ESP8266 Wifi Chip
#include <BlynkSimpleEsp8266.h> // Blynk App Library, used to track BPM on your mobile device or web browser

#include <SoftwareSerial.h> // Library for connecting Arduino and NodeMCU separate Serial Monitors
#include <ArduinoJson.h> // Library used to send data as an object

SoftwareSerial nodemcu(D6, D5); //D6 Pin for Rx, D5 Pin for Tx

// Setup Auth token and credentials for App and Wifi
#define BLYNK_TEMPLATE_ID "TMPLHIkLZlMb"
#define BLYNK_TEMPLATE_NAME "Heart"
#define BLYNK_AUTH_TOKEN "mQXJZJP9Mz1kdFbF7rD2gkdZYavj3iRv"

char auth[] = BLYNK_AUTH_TOKEN;            // You should get Auth Token in the Blynk App.

char ssid[] = "Nilay";    // Your WiFi credentials. (Mobile Hotspot)
char pass[] = "abcd12345";  // Set password to "" for open networks.


void setup() {
  Serial.begin(9600); // For Serial Monitor
  nodemcu.begin(9600); //For Connected Serial Monitor
  
  while (!Serial) continue; // retry connecting if it does not connect
  
  Blynk.begin(auth, ssid, pass); // make connection to Blynk

}
void loop() {
    
    Blynk.run(); // Run Blynk
    
    StaticJsonBuffer<1000> jsonBuffer;
    JsonObject& data = jsonBuffer.parseObject(nodemcu); // Here we do not create a new object, but catch the object we get from Arduino

    if(data == JsonObject::invalid()) { // Checks for invalid data received
      Serial.println("Invalid Json Object");
      jsonBuffer.clear();
      return; // loop again
    }

    Serial.println("JSON Object Received"); // Object is received with valid data
    int bpm = data["bpm"]; // store the bpm value 
    Serial.println(bpm);
    Blynk.virtualWrite(V0, bpm); // Send the bpm and write to VIRTUAL PIN V0, which we created in our Blynk dashboard
    delay(1000); // 1 sec delay
}


