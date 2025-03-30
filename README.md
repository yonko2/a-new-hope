# A New Hope

## Table of Contents
1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Backend Documentation](#backend-documentation)
    - [Technology Stack](#backend-technology-stack)
    - [Project Structure](#backend-project-structure)
    - [Key Components](#backend-key-components)
    - [API Endpoints](#backend-api-endpoints)
4. [Frontend Documentation](#frontend-documentation)
    - [Technology Stack](#frontend-technology-stack)
    - [Project Structure](#frontend-project-structure)
    - [Main Components](#frontend-main-components)
    - [State Management & Custom Hooks](#frontend-state-management--custom-hooks)
5. [Installation and Setup](#installation-and-setup)
6. [Usage Guide](#usage-guide)
7. [Deployment](#7-deployment)

---

## 1. Introduction

**A New Hope** is an innovative full-stack simulation platform designed to model and manage critical resources within a dynamic environment on the planet Mars. The project is divided into two main components:

- **Backend:** Developed with Java and Spring Boot, it encapsulates the business logic, data modeling, and RESTful APIs required to drive the simulation.
- **Frontend:** Built using React, TypeScript, and Three.js, it provides an interactive, real-time visualization of the simulation, allowing users to monitor and control various parameters.

---

## 2. Project Overview

The simulation focuses on essential resource management such as air, water, food, and other critical resources. It models complex interactions like population dynamics and delivery logistics, providing insights into how resources are allocated and consumed over time.

### Purpose and Goals
- **Realistic Simulation:** Simulate real-world resource distribution and management scenarios to better understand dynamic systems.
- **Interactive User Experience:** Offer a visually appealing, user-friendly interface for real-time simulation control.
- **Modularity and Extensibility:** Ensure a clear separation between the backend and frontend for easy maintenance, future enhancements, and integration with additional systems.

---

## 3. Backend Documentation

### Backend Technology Stack
- **Programming Language:** Java 21
- **Framework:** Spring Boot 3.4
- **Build Tool:** Maven
- **Libraries:** Common Spring Boot libraries such as SLF4J, Logback, etc.

### Backend Project Structure
- **Package Organization:**  
  The project follows a layered architecture under the base package `com.hackaton.project.anewhopebe`.  
  _TBD: Detailed package and directory structure._

### Backend Key Components
- **Data Models:**
    - *Air, Food, Water, Resource, Deficiency* – Define the simulation’s domain entities.
- **Service Layer:**
    - *SimulationService, PopulationService, ResourcesService, DeficiencyService* – Encapsulate the business logic.
- **Controllers:**
    - *SimulationController* – Exposes RESTful endpoints to manage the simulation.

### Backend API Endpoints
- **/simulate:** Initiates the simulation.
- **/add-resources:** Adds resources to the simulation.
- **/reset:** Resets the simulation.

---

## 4. Frontend Documentation

### Frontend Technology Stack
- **Programming Language:** TypeScript
- **Framework:** React (with Vite)
- **State Management:** Zustand, React Query
- **3D Visualization:** Three.js / Fiber

### Frontend Project Structure
- _TBD: A detailed breakdown of the directory and file structure._

### Frontend Main Components
- **Overlay:** The primary component for user interface interactions.
- **SpaceScene:** The main visualization component displaying the simulation in a 3D space.

### Frontend State Management & Custom Hooks
- **Custom Hooks:**
    - *TimeUpdater, DeliveryUpdater, DeliveryEventEmitter, PopulationSpread* – Manage dynamic simulation updates.
- **Stores:**
    - *TimeStore, DeliveryStore, SceneStore, SimulationStore* – Centralized state management for the application.

---

## 5. Installation and Setup

### Prerequisites
Ensure the following software is installed:
- **Java Development Kit (JDK) 21**
- **Maven** (for the backend)
- **Node.js** and **npm** (for the frontend)
- **Git**

### Cloning the Repository
Clone the project repository
```
git clone https://github.com/yonko2/a-new-hope
```

Frontend
```
cd a-new-hope/a-new-hope-fe
npm i
npm run dev
```
Backend
```
cd a-new-hope/a-new-hope-be
mvn clean install
mvn spring-boot:run
```

## 6. User Guide
After the application is started the user is able to play a simulation. On constant time a modal pop up and a decision must be made on how to manage resources.
The main view is the planet Mars that could be moved around via OrbitControls in a 3D world motion
In the left top corner is located a button that could change the view from orbit to map. After that planet Earth appears, the motion becomes 2D world and on every cargo a rocket appears from Earth to Mars. Once the simulation ends the user gets ending screen and is able to restart everything.

## 7. Deployment

Frontend deployed on Github Pages:  
https://yonko2.github.io/a-new-hope/
Backend deployed on Heroku
