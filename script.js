let resultado = document.getElementById("resultado");

let btn_upload = document.getElementById("btn-upload-csv").addEventListener("click", () => {
    Papa.parse(document.getElementById("upload-csv").files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: function (results) {

            // Riqueza

            console.log("calculando...")
            data = results;
            comunidade = data.data
            let spp = comunidade.length;


            // Total de individuos

            function somaDeInd(total, comunidade) {
                return total + comunidade.n;
            }

            let TotalInd = comunidade.reduce(somaDeInd, 0);

            // Proporcao da i-esima especie

            function pi(sp) {
                return sp.n / TotalInd;
            }

            let PropSpp = comunidade.map(pi);
            console.log(PropSpp);


            // log de pi

            function LogProp(pi) {
                return Math.log(pi);
            }

            let logprop = PropSpp.map(LogProp);
            console.log(logprop);


            // Pi x logpi

            let PixLogPi = PropSpp.map(function (num, idx) {
                return num * logprop[idx];
            });


            // Shannon

            function Shannon(total, PixLogPi) {
                return total + PixLogPi;
            }

            let H_positivo = PixLogPi.reduce(Shannon, 0);
            let H = parseFloat(-1 * H_positivo).toFixed(2);


            // Pielou

            let logS = Math.log(spp);
            let J = parseFloat(H/logS).toFixed(2); 
            
            
            resultado.innerHTML = `<p> Total de indivíduos: ${TotalInd} ind.; </p>`
            resultado.innerHTML += `<p> Total de espécies: ${spp} spp; </p>`
            resultado.innerHTML += `<p> Índice de Shannon: ${H} nat.ind; </p>`
            resultado.innerHTML += `<p> Equabilidade de Pielou: ${J}. </p>`

        }
    });

});

