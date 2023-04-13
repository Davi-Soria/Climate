document.querySelector(".pesquisar").addEventListener('submit', async(event) => {
    event.preventDefault();

    let input = document.querySelector("#input").value;

    if(input !== ''){
        clearInfo(),
        showWarning('...carregando');

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=bb3d7c2fc8c3902e291dd20de524656e`)
        let json = await results.json();

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                tempMin: json.main.temp_min,
                tempMax: json.main.temp_max,
                windSpeed: json.wind.speed,
                windDeg: json.wind.deg,
                icon: json.weather[0].icon,
            });
    } else {
        clearInfo();
        showWarning('...não encontramos a localização!!')
    }   
} else {
    clearInfo();
}
})

function clearInfo() {
    showWarning('')
    document.querySelector('.container').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg

}

function showInfo(json){
    showWarning('');

    document.querySelector('.cidade').innerHTML = `${json.name}-${json.country}`;
    document.querySelector('.temp-max-info').innerHTML = `${Math.trunc(json.tempMax)} <sup>ºC</sup>`;
    document.querySelector('.temp-min-info').innerHTML = `${Math.trunc(json.tempMin)} <sup>ºC</sup>`;
    document.querySelector('.weather img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icon}@2x.png`);
    document.querySelector('.vento-info').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.vento-ponto').style.transform = `rotate(${json.windDeg+90}deg)`;

    document.querySelector('.container').style.display ='block';
}