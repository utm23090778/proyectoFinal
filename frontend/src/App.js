import { Card, Container, Form, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [answers, setAnswers] = useState({});

  const questionnaire = {
    preguntas: [
      "¿El profesor muestra interés en el progreso de los estudiantes?",
      "¿El profesor utiliza diferentes métodos de enseñanza?",
      "¿El profesor es accesible para resolver dudas?",
      "¿El profesor fomenta la participación en clase?",
      "¿El profesor explica los conceptos de manera clara?",
      "¿El profesor es puntual en las clases?",
      "¿El profesor respeta las opiniones de los estudiantes?",
      "¿El profesor proporciona retroalimentación constructiva?",
      "¿El profesor crea un ambiente de aprendizaje positivo?",
      "¿El profesor está actualizado en su materia?",
      "¿El profesor establece expectativas claras?",
      "¿El profesor motiva a los estudiantes a aprender?",
      "¿El profesor maneja bien el tiempo durante la clase?",
      "¿El profesor se preocupa por el bienestar emocional de los estudiantes?",
      "¿El profesor fomenta el trabajo en equipo?",
      "¿El profesor utiliza recursos didácticos variados?",
      "¿El profesor maneja adecuadamente la disciplina en clase?",
      "¿El profesor es amable y respetuoso con los estudiantes?",
      "¿El profesor adapta su enseñanza a las necesidades de los estudiantes?",
      "¿El profesor fomenta el pensamiento crítico entre los estudiantes?"
    ],
    opciones: [
      "Siempre",
      "A veces",
      "Rara vez",
      "Nunca"
    ]
  };
  const onChange = (e) => {
    e.preventDefault();
    const data = answers;
    data[e.target.name] = e.target.value;
    setAnswers(data);
  }
  const onSumbit = async () => {
    //Validar que las preguntas fueron contestadas
    const questionsUnanswered = [];
    questionnaire.preguntas.map((_, i) => {
      if (!answers[`pregunta_${i}`]) {
        questionsUnanswered.push(i + 1)
      }
    })
    if (questionsUnanswered.length > 0) {
      Swal.fire(
        "Opppss!, parece que faltan preguntas por contestar",
        questionsUnanswered.join(', '),
        "error"
      );
      return;
    }
    Swal.fire("Enviando respuestas")
    Swal.showLoading()
    try {
      await axios.post("http://localhost:4000/save-answers", answers);
      Swal.fire("Respuestas almacenadas con exito :3","","success").then(()=>window.location.reload)
    } catch (error) {
      Swal.fire("Opsss! Ocurrio un error al guardar tus respuestas", error.msg, "error")
    }
  }

  return (
    <Container className='mt-3'>
      <Card>
        <Card.Body>
          <Card.Title>Formulario de evaluación docentes</Card.Title>
          {
            questionnaire.preguntas.map((pregunta, i) => (
              <Form.Group key={`q-${i}`}>
                <Form.Label>{`${i + 1}._ ${pregunta}`}</Form.Label>
                <Form>
                  {
                    questionnaire.opciones.map((opcion, io) => (
                      <Form.Check
                        value={opcion}
                        onChange={onChange}
                        key={`q-${i}-o-${io}`}
                        type="radio"
                        id={`opcion-${io}-pregunta_${i}`}
                        name={`pregunta_${i}`}
                        label={opcion}
                      />
                    ))
                  }
                </Form>
              </Form.Group>
            ))
          }
          <Row className='text-center'>
            <Col>
              <Button onClick={()=>onSumbit()}>Enviar</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}
export default App;
