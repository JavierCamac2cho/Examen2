document.addEventListener('DOMContentLoaded', function() {
    const FormNuevoAlumno = document.getElementById('form_nuevo_alumno');
    if (FormNuevoAlumno) {
        FormNuevoAlumno.addEventListener('submit', function(e) {
            e.preventDefault();
            const grupo = document.getElementById('grupodealumno').value;
            const matricula = document.getElementById('matriculadealumno').value;
            const nombre = document.getElementById('nombredealumno').value;
            const requestOptions = {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ grupo, matricula, nombre }) 
            };
            fetch('/alumnos', requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                alert(data.message + ": " + data.nombre);
                FormNuevoAlumno.reset();
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Error al obtener los datos');
            });
        });
    }
    const FormNuevoSistema = document.getElementById('form_nuevo_sistema');
    if (FormNuevoSistema) {
        FormNuevoSistema.addEventListener('submit', function(e) {
            e.preventDefault();
            const s1 = document.getElementById('sistema1').value;
            const s2 = document.getElementById('sistema2').value;
            const s3 = document.getElementById('sistema3').value;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ s1, s2, s3})
            };
            fetch('/sistemas', requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                alert(data.message + ": " + data.sistema);
                FormNuevoSistema.reset();
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Error al obtener los datos');
            });
        });
    }
    const FormActualizarAlumno = document.getElementById('form_actualizar_alumno');
    if (FormActualizarAlumno) {
        FormActualizarAlumno.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('iddelalumno1').value;
            const grupo = document.getElementById('grupodealumno1').value;
            const matricula = document.getElementById('matriculadealumno1').value;
            const nombre = document.getElementById('nombredealumno1').value;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, grupo, matricula, nombre })
            };
            fetch('/alumnos', requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                alert(data.message + ": " + data.nombre);
                FormActualizarAlumno.reset();
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Error al actualizar los datos');
            });
        });
    }
    const FormActualizarSistema = document.getElementById('form_actualizar_sistema');
    if (FormActualizarSistema) {
        FormActualizarSistema.addEventListener('submit', function(e) {
            e.preventDefault();
            const id = document.getElementById('idsisteman').value;
            const sistema1 = document.getElementById('sistema1n').value;
            const sistema2 = document.getElementById('sistema2n').value;
            const sistema3 = document.getElementById('sistema3n').value;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, sistema1, sistema2, sistema3 })
            };
            fetch('/sistemas', requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                alert(data.message + ": " + data.id);
                FormActualizarSistema.reset();
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Error al actualizar los datos');
            });
        });
    }
    const FormNuevaPractica = document.getElementById('form_nueva_practica');
    if (FormNuevaPractica) {
        FormNuevaPractica.addEventListener('submit', function(e) {
            e.preventDefault();
            const idalumno = document.getElementById('id_alumno').value;
            const idsistema = document.getElementById('id_sistema').value;
            const numero_practica = document.getElementById('numero_practica').value;
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idalumno, idsistema, numero_practica })
            };
            fetch('/practicas', requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                alert(data.message + ": " + data.numero_practica);
                FormNuevaPractica.reset();
            })
            .catch(function(error) {
                console.error('Error:', error);
                alert('Error al obtener los datos');
            });
        });
    }
    const formConsultaPractica = document.getElementById('form_consulta_practica');
    if (formConsultaPractica) {
        formConsultaPractica.addEventListener('submit', function(e) {
            e.preventDefault();
            const numero_practica = document.getElementById('numero_practica_consulta').value;
            alert(numero_practica)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numero_practica })
            };

            fetch('/consultar_practica', requestOptions)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(function(data) {
                const resultadosDiv = document.getElementById('resultados');
                resultadosDiv.innerHTML = '';
                if (data.datos) {
                    data.datos.forEach(function(item) {
                        const p = document.createElement('p');
                        p.textContent = `Nombre del Alumno: ${item.nombre_alumno}, Sistema: ${item.id_sistema}`;
                        resultadosDiv.appendChild(p);
                    });
                } else {
                    const p = document.createElement('p');
                    p.textContent = 'No se encontraron resultados para el número de práctica proporcionado.';
                    resultadosDiv.appendChild(p);
                }
            })
            .catch(function(error) {
                alert(error);
            });
        });
    }
});

