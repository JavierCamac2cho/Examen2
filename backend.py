import mysql.connector
from flask import Flask, request, jsonify, render_template
app = Flask(__name__)

def conectar_bd():
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='123456',
        database='ejercicioclase09_04'
    )
    return conn

def index():
    return render_template('index.html')
app.add_url_rule('/', 'index', index)

def alumnos():
    if request.method == 'POST':
        data = request.json
        grupo = data['grupo']
        matricula = data['matricula']
        nombre = data['nombre']

        conn = conectar_bd()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO alumno (grupo, matricula, nombre) VALUES (%s, %s, %s)", (grupo, matricula, nombre))
        conn.commit()
        conn.close()

        return jsonify({'message': 'El alumno se agregó a la base de datos correctamente', 'nombre': nombre}), 200
    else:
        return 'Método no permitido', 405
    
app.add_url_rule('/alumnos', 'alumnos', alumnos, methods=['POST'])

def sistemas():
    if request.method == 'POST':
        data = request.json
        sistema1 = data['s1']
        sistema2 = data['s2']
        sistema3 = data['s3']

        conn = conectar_bd()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO sistema (p1, p2, p3) VALUES (%s, %s, %s)", (sistema1, sistema2, sistema3))
        conn.commit()
        conn.close()

        return jsonify({'message': 'El sistema se agregó a la base de datos correctamente', 'sistema': sistema1}), 200
    else:
        return 'Método no permitido', 405
    
app.add_url_rule('/sistemas', 'sistemas', sistemas, methods=['POST'])

def actualizar_alumno():
    if request.method == 'PUT':
        data = request.json
        id_alumno = data['id']
        grupo = data['grupo']
        matricula = data['matricula']
        nombre = data['nombre']

        conn = conectar_bd()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM alumno WHERE idalumno = %s", (id_alumno,))
        alumno_existente = cursor.fetchone()
        if not alumno_existente:
            conn.close()
            return jsonify({'message': 'El ID del alumno no existe'}), 404
        cursor.execute("""
            UPDATE alumno 
            SET grupo = %s, matricula = %s, nombre = %s 
            WHERE idalumno = %s
        """, (grupo, matricula, nombre, id_alumno))
        conn.commit()
        conn.close()

        return jsonify({'message': 'El alumno se actualizó correctamente', 'nombre': nombre}), 200
    else:
        return 'Método no permitido', 405
    
app.add_url_rule('/alumnos', 'actualizar_alumno', actualizar_alumno, methods=['PUT'])

def actualizar_sistema():
    if request.method == 'PUT':
        data = request.json
        id_sistema = data['id']
        sistema1 = data['sistema1']
        sistema2 = data['sistema2']
        sistema3 = data['sistema3']

        conn = conectar_bd()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sistema WHERE idsistema = %s", (id_sistema,))
        sistema_existente = cursor.fetchone()
        if not sistema_existente:
            conn.close()
            return jsonify({'message': 'El ID del sistema no existe'}), 404
        cursor.execute("""
            UPDATE sistema 
            SET p1 = %s, p2 = %s, p3 = %s 
            WHERE idsistema = %s
        """, (sistema1, sistema2, sistema3, id_sistema))
        conn.commit()
        conn.close()

        return jsonify({'message': 'El sistema se actualizó correctamente', 'idsistema': id_sistema}), 200
    else:
        return 'Método no permitido', 405
    
app.add_url_rule('/sistemas', 'actualizar_sistema', actualizar_sistema, methods=['PUT'])

def nueva_practica():
    if request.method == 'POST':
        data = request.json
        idalumno = data['idalumno']
        idsistema = data['idsistema']
        numero_practica = data['numero_practica']

        conn = conectar_bd()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO lab (idalumno, idsistema, numero_practica) VALUES (%s, %s, %s)", (idalumno, idsistema, numero_practica))
        conn.commit()
        conn.close()

        return jsonify({'message': 'La práctica se agregó correctamente', 'numero_practica': numero_practica}), 200
    else:
        return 'Método no permitido', 405
    
app.add_url_rule('/practicas', 'nueva_practica', nueva_practica, methods=['POST'])

def consultar_practica():
    if request.method == 'POST':
        data = request.json
        print(data)
        numero_practica = data['numero_practica']
        print(numero_practica)

        conn = conectar_bd()
        cursor = conn.cursor()
        query = "SELECT alumno.nombre, sistema.idsistema FROM alumno INNER JOIN lab INNER JOIN sistema ON lab.idalumno = alumno.idalumno AND lab.idsistema = sistema.idsistema WHERE lab.numero_practica = %s"
        cursor.execute(query, (numero_practica,))
        resultados = cursor.fetchall()
        print(resultados)
        conn.close()

        if not len(resultados):
            return jsonify({'message': 'No se encontraron resultados para el número de práctica proporcionado.'}), 404
        else:
            datos = [{'nombre_alumno': resultado[0], 'id_sistema': resultado[1]} for resultado in resultados]
            return jsonify({'message': 'Se consultará la práctica', 'datos': datos}), 200
    else:
        return jsonify({'message': 'Método no permitido.'}), 404
    
app.add_url_rule('/consultar_practica', 'consultar_practica', consultar_practica, methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True)