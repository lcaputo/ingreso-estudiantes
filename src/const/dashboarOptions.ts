import { GoogleChartOptions } from "react-google-charts";
export const options: GoogleChartOptions | Object = {
    chart: {
        title: "Registros de entradas",
        subtitle: "Registro de entradas de las personas en las ultimas 24h"
    },
    hAxis: {
        title: "Hours",
        textStyle: {
            fontSize: "0.5rem", // Tamaño de la fuente en el eje X
        },

    },
    vAxis: {
        title: "PEOPLE COUNT",
        viewWindow: {
            min: 0, // Valor mínimo en el eje Y
        },
        format: "0", // Formato sin decimales en el eje Y
        minValue: 0
    },

};