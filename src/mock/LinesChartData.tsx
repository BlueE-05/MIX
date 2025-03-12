import { Line } from 'react-chartjs-2'
import{
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


var closed = [1, 2, 7, 6, 4, 9, 7, 5, 4, 4, 7, 5, 9, 9, 9, 6, 4, 6, 6, 8, 5, 5, 7, 6, 6, 8, 4, 8, 8];
var active = [4, 3, 9, 4, 7, 4, 5, 4, 7, 6, 5, 8, 6, 5, 4, 5, 8, 6, 5, 4, 8, 8, 5, 6, 8, 7, 8, 8, 4];
var canceled = [5, 8, 9, 5, 6, 9, 6, 6, 6, 9, 6, 8, 8, 9, 5, 7, 7, 6, 5, 4, 4, 7, 6, 6, 7, 5, 4, 9, 6];

var days=["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

var midata={
    labels: days,

    datasets:[
        {
            label: 'Closed',
            data: closed,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(0,255,0)',
            backgroundColor: 'rgba(0,255,0,0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(0,255,0)',
            pointBackgroundColor: 'rgba(0,255,0)', 
        },
        
        {
            label: 'Active',
            data: active,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255,255,0)',
            backgroundColor: 'rgba(255,255,0,0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255,255,0)',
            pointBackgroundColor: 'rgba(255,255,0)', 
        },
        

        
        {
            label:'Canceled',
            data: canceled,
            tension: 0.5,
            fill: true,
            borderColor: 'rgb(255,99,132)',
            backgroundColor: 'rgba(255,99,132,0.5)',
            pointRadius: 5,
            pointBorderColor: 'rgba(255,99,132)',
            pointBackgroundColor:'rgba(255,99,132)',
        },

    ],
};

var misoptions={
    scales:{
        y:{
            min:0
            
        },
        x:{
            ticks:{color: 'white'}
        }
    },

    plugins:{
        legend:{
            display:true
        }
    }
};


export default function LinesChartData(){
    return <Line data={midata} options={misoptions}/>
}