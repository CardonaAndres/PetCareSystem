# 🐾 PetCareSystem  

PetCareSystem es el backend de **Mascoticas**, una aplicación diseñada para la gestión de mascotas. Proporciona una **API RESTful** para manejar operaciones relacionadas con usuarios, mascotas y veterinarios.  

## 🚀 Características  

- 📌 **Autenticación y gestión de usuarios** (registro, inicio de sesión, recuperación de contraseña).  
- 🐶 **Administración de mascotas** (perfiles, historial médico, vacunas).  
- 📅 **Gestión de citas veterinarias** (agendamiento, cancelaciones, historial).  
- 🔔 **Notificaciones y recordatorios** (citas, vacunas, seguimientos).  

## 🛠️ Requisitos  

Para ejecutar el proyecto, asegúrate de tener instalado:  

- [Node.js](https://nodejs.org/)  
- [MySQL](https://www.mysql.com/)  

## 📦 Instalación  

1. **Clona el repositorio**:  
    ```bash
    git clone https://github.com/tu-usuario/PetCareSystem.git
    ```
2. **Accede al directorio del proyecto**:  
    ```bash
    cd PetCareSystem
    ```
3. **Instala las dependencias**:  
    ```bash
    npm install
    ```

## ⚙️ Configuración  

1. Configura las variables de entorno en el archivo:  
   ```
   configs/config
   ```
2. Asegúrate de que la base de datos MySQL esté configurada y en ejecución.  

## ▶️ Uso  

1. **Inicia el servidor**:  
    ```bash
    npm start
    ```
2. La API estará disponible en:  
   ```
   http://localhost:5050
   ```
3. Para probar los endpoints, puedes usar herramientas como [Postman](https://www.postman.com/) o [cURL](https://curl.se/).  

## 📜 Licencia  

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.  
