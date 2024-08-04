## Inspiration 🔥
Last year, in Canada alone:
* Over 230,000 persons were evacuated because of potential dangers to life and health.
* 6,623 wildland fires burned more than 15 million hectares of Canada’s managed forests.

[source](https://natural-resources.canada.ca/our-natural-resources/forests/wildland-fires-insects-disturbances/forest-fires/13143)

As climate change accelerates and wildfire seasons become more intense, monitoring and managing these crises are an important part of preserving our environment. Firewall aims to provide firefighters and first responders with critical information, optimize resource allocation, and improve communication. Our app seeks to not only strengthen immediate response efforts but also support long-term strategies for wildfire prevention and management, safeguarding lives, property, and ecosystems.

## What it does ✨
Firewall makes reporting wildfires an efficient and streamlined process that anyone can do easily:

1. Users take a video of a nearby forest fire and upload it to Firewall.

2. The uploaded video is sent to a dispatch app, where we use the video to generate a 3D model of the fire and analyze it to assign a severity classification (no fire, low fire, high fire). This process ensures that the fire is accurately assessed and ready for further action. This information enables emergency services to determine the appropriate number and type of first responders to dispatch.

3. The 3D model, severity classification, and geo coordinates are sent to a dedicated app for first responders. On this platform, firefighters can view the 3D model and severity details on a map, enabling them to make informed decisions and respond efficiently to the situation.  

## How we built it 👨‍💻
Firewall has three main components:

**Reporter app:** 
* **Front end:** The front end was created with **React Native** using the **Expo** framework.

* **Back end:** Videos get uploaded to **Firebase**. After, the link and the geocoordinates of the video are stored in a **MongoDB** database. 

**Dispatch app:** 
* **Frontend:** The frontend leverages a real-time MongoDB trigger that continuously monitors the Event Table for any changes. The moment a detected wildfire, is added, the frontend automatically refreshes to display the updated information. Additionally, the frontend features an integrated **3D viewer**, allowing users to visualize detailed 3D models of the fire.

* **Backend:** The backend of the dispatch app was designed to process video data received from Firebase. The first frame of each video is extracted and analyzed using a **Convolutional Neural Network (CNN)** implemented in **MATLAB** to classify the fire's severity state. Subsequently, the entire video is processed into a **3D Gaussian Splat model**, which captures spatial and temporal information. The resulting 3D model and CNN classification results, is then uploaded to a **MongoDB** database.

**First responder app:** 
* **Frontend:** The front end was also made using React Native with the Expo framework. It features a 3D Gaussian Splat Viewer, which allows users to visualize detailed 3D models of fires. The app receives push notifications from the Admin App, delivering critical updates on fire conditions. A map interface displays the locations of active fires using clickable pins, which lead to a detailed page for each fire.

* **Backend:**  The app retrieves the Gaussian splat model from Firebase to ensure that all data is up-to-date and readily accessible.

## Challenges we ran into 😥
* **Developing Video Recording and Uploading Features:** Implementing a reliable video recording and uploading system within the app turned out to be much more time-consuming than we initially thought. 😭

* **Integrating MongoDB with an Expo Frontend:** We initially attempted to directly connect our Expo-based frontend app to MongoDB, only to discover that this approach was not viable. 

* **Minimizing Latency in 3D Model Generation:** Reducing the latency involved in converting videos into high-fidelity 3D models. Achieving accuracy while keeping the processing time within acceptable limits was an extensive and time-consuming process.

* Bahen was very cold at night :(

## Accomplishments that we're proud of 😊
* **Development of a Gaussian Model:** Our project successfully utilizes the Gaussian model in order to create a 3D view of the wildfire surroundings based off of a single video. 

* **Automated Pipeline for Video Processing and Feature Extraction:** We automated the entire pipeline that converts videos into individual frames, extracts essential location-based features, and then feeds these into our machine learning model. Through fine-tuning iterations and adjusting resolutions, we’ve optimized this pipeline to produce high-fidelity 3D models.

* **CNN Classification:** Successfully developed a neural network model capable of accurately classifying our varying levels of fire severity.

* **Seamless Video Capture and Media Storage Integration:** Another achievement we're particularly proud of is the seamless integration of video capture and media storage. Users can easily record a video of a wildfire, and our app automatically uploads it to a secure media storage system.

## What we learned 🌱
* **Yoonie:** I feel like this has been a very introspective and philosophical experience for me. Also I learned how to use react better. 

* **Marshal:** It probably would've been better to limit the number of features in our pipeline. By reducing the complexity of the feature set, we could have improved the latency of processes like Gaussian splatting and other pipeline operations.

* **Cailyn:** This is the second time I’ve worked with React Native! It wasn’t any easier than the first 😔. I got to touch on a lot of new technologies I haven’t worked with before like MongoDB. Overall this was a really fun experience and I learned a lot from my other team members. :)

* **Will:** This is the first time I’ve worked with neural networks, and I’ve found it to be a unique and novel challenge. Recording the same video over and over builds character.

## What's next for Firewall 
* **Optimizing Latency and Loading Times:** A key area for future improvement is the optimization of latency and loading times across the app. We’re particularly focused on reducing the time it takes to process videos and generate 3D models, as well as improving the responsiveness of the camera functionality within the app. 

* **Implementing Additional Features:** We had several features that we didn’t have the chance to implement, including semantic analysis using the Cohere API. This feature would allow us to analyze and interpret the content of user-uploaded videos at a deeper level, enhancing our ability to classify and respond to wildfire reports more accurately.
