import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import Swal from 'sweetalert2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Charts() {
    const [numberAnswers, setNumberAnswers] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        try {
            Swal.fire("Cargando datos")
            Swal.showLoading()
            const { data } = await axios.get("http://localhost:4000/get-answers-to-chart");
            setNumberAnswers(data);
            Swal.close()
        } catch (error) {
            Swal.fire("Opsss algo salio mal", error.msg, "error")
        }
    }


    const data = {
        labels: [
            "Siempre",
            "A veces",
            "Rara vez",
            "Nunca"
        ],
        datasets: [
            {
                label: '# de respuestas',
                data: numberAnswers,//Numero de cantidad de respuestas base a las etiquetas
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <Container >
            <Card className='text-center'>
                <Card.Body>
                    <div style={{ width: "300px", height: "300px", margin:"auto" }}>
                        <Doughnut data={data} />
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}
