# Doctor Management System (DocManage)

A modern, lightweight Spring Boot application for healthcare providers to manage doctor registries efficiently. Featuring a sleek, responsive glassmorphism UI and file-based persistence for easy deployment.

## 🚀 Features

- **Dashboard Overview**: Quick stats and rapid search functionality.
- **Doctor Registry**: Comprehensive list of all registered doctors with search and filter options.
- **Full CRUD Operations**:
  - **Create**: Add new doctors with validation (ID, Name, Specialization, Contact).
  - **Read**: View detailed doctor information in a modern table layout.
  - **Update**: Modify existing doctor details seamlessly.
  - **Delete**: Secure deletion with confirmation prompts.
- **Persistence**: Data is stored locally in a structured file system (`doctors.txt`), eliminating the need for complex database setups for small-scale use.
- **Responsive Design**: Built with Bootstrap 5 and custom CSS for a premium look and feel across all devices.

## 🛠️ Technology Stack

- **Backend**: Java 21, Spring Boot 4.0.5
- **Frontend**: HTML5, CSS3 (Vanilla + Custom Design), JavaScript (ES6+)
- **Styling**: Bootstrap 5, Font Awesome, Google Fonts (Inter, Outfit)
- **Build Tool**: Maven
- **Storage**: File-based (CSV format)

## 📋 Prerequisites

- **Java JDK 21** or higher
- **Maven 3.6+** (optional, uses Maven Wrapper)

## ⚙️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/doctor-management-system.git
   cd doctor-management-system
   ```

2. **Build the project**:
   ```bash
   ./mvnw clean install
   ```

3. **Run the application**:
   ```bash
   ./mvnw spring-boot:run
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:8080`

## 📂 Project Structure

```text
src/main/java/com/example/doctormanagement/
├── controller/    # REST Endpoints
├── model/         # Data Objects (Doctor)
├── repository/    # File-based Data Access
├── service/       # Business Logic
└── util/          # File Handling Utilities

src/main/resources/
├── data/          # Persistent Storage (doctors.txt)
└── static/        # Frontend Assets (HTML, CSS, JS)
```
