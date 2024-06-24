document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario está logeado
    const user = JSON.parse(localStorage.getItem('Ingreso_exitoso')) || false;
    if (!user) {
      window.location.href = 'login.html';
    }
  
    const formularioAgregar = document.querySelector('#formularioAgregar');
    const tablaRegistros = document.querySelector('#tbodyRegistros');
    const logout = document.querySelector('#logout');
  
    // Mostrar registros almacenados al cargar la página
    mostrarRegistros();
  
    // Agregar evento al formulario de agregar
    formularioAgregar.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Obtener valores del formulario
      const cedula = document.querySelector('#cedula').value;
      const nombre = document.querySelector('#nombre').value;
      const edad = document.querySelector('#edad').value;
      const direccion = document.querySelector('#direccion').value;
  
      // Validar que no haya campos vacíos
      if (cedula === '' || nombre === '' || edad === '' || direccion === '') {
        alert('Por favor complete todos los campos.');
        return;
      }
  
      // Agregar nuevo registro
      agregarRegistro(cedula, nombre, edad, direccion);
  
      // Limpiar formulario
      formularioAgregar.reset();
  
      // Actualizar la tabla mostrando los registros actualizados
      mostrarRegistros();
    });
  
    // Función para agregar un nuevo registro
    function agregarRegistro(cedula, nombre, edad, direccion) {
      const nuevoRegistro = { cedula, nombre, edad, direccion };
      let registros = JSON.parse(localStorage.getItem('registros')) || [];
      registros.push(nuevoRegistro);
      localStorage.setItem('registros', JSON.stringify(registros));
    }
  
    // Función para mostrar todos los registros en la tabla
    function mostrarRegistros() {
      let registros = JSON.parse(localStorage.getItem('registros')) || [];
      let tablaHTML = '';
  
      registros.forEach((registro, index) => {
        tablaHTML += `
          <tr>
            <td>${registro.cedula}</td>
            <td>${registro.nombre}</td>
            <td>${registro.edad}</td>
            <td>${registro.direccion}</td>
            <td>
              <button onclick="editarRegistro(${index})">Editar</button>
              <button onclick="eliminarRegistro(${index})">Eliminar</button>
            </td>
          </tr>
        `;
      });
  
      tablaRegistros.innerHTML = tablaHTML;
    }
  
    // Función para eliminar un registro
    window.eliminarRegistro = function(index) {
      let registros = JSON.parse(localStorage.getItem('registros')) || [];
      registros.splice(index, 1);
      localStorage.setItem('registros', JSON.stringify(registros));
      mostrarRegistros();
    };
  
    // Función para editar un registro
    window.editarRegistro = function(index) {
      let registros = JSON.parse(localStorage.getItem('registros')) || [];
      const registro = registros[index];
      document.querySelector('#cedula').value = registro.cedula;
      document.querySelector('#nombre').value = registro.nombre;
      document.querySelector('#edad').value = registro.edad;
      document.querySelector('#direccion').value = registro.direccion;
  
      // Eliminar el registro original después de editarlo
      registros.splice(index, 1);
      localStorage.setItem('registros', JSON.stringify(registros));
  
      // Actualizar la tabla mostrando los registros actualizados
      mostrarRegistros();
    };
  
    logout.addEventListener('click', () => {
      alert('Hasta pronto');

      localStorage.removeItem('Ingreso_exitoso');
      window.location.href = 'login.html'; 
    });
  });
  