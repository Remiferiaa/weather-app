function curDate(increment) {
  let today = new Date();
  today.setDate(today.getDate() + increment);
  const day = today.toLocaleString('default', { day: 'numeric' });
  const weekday = today.toLocaleString('default', { weekday: 'short' });
  const month = today.toLocaleString('default', { month: 'long' });
  today = `${month} ${day}, ${weekday}`;
  return today;
}

async function getWeather(location, measure) {
  try {
    if (location === '') throw "*Location Can't be empty";
    const coord = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d54d13f97f0cd0c1021e663f6c303724`);
    if (coord.status >= 400 && coord.status < 500) throw '*Location not found';
    const coordData = await coord.json();
    const { lon } = coordData.coord;
    const { lat } = coordData.coord;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${measure}&exclude=minutely,hourly&appid=d54d13f97f0cd0c1021e663f6c303724`);
    const data = await response.json();
    console.log(data);
    today(data, location, measure);
    future(data, measure);
  } catch (err) {
    document.querySelector('.error').innerHTML = err;
  }
}

function today(data, location, measure) {
  const current = document.createElement('div');
  const place = document.createElement('p');
  const curTemp = document.createElement('p');
  const humid = document.createElement('p');
  if (measure === 'imperial') {
    measure = '℉';
  } else {
    measure = '℃';
  }
  current.setAttribute('class', 'todayTemp');
  place.setAttribute('class', 'curLocation');
  place.innerHTML = location;
  curTemp.innerHTML = `Current Temp: ${data.current.feels_like}${measure}`;
  humid.innerHTML = `Humidity: ${data.current.humidity}%`;

  current.append(place, curTemp, humid);
  document.querySelector('.now').append(current);
}

function future(data, measure) {
  if (measure === 'imperial') {
    measure = '℉';
  } else {
    measure = '℃';
  }
  for (let i = 1; i < data.daily.length; i++) {
    const wrapper = document.createElement('div');
    const time = document.createElement('p');
    const temperature = document.createElement('p');
    const humidity = document.createElement('p');
    const dayTemp = data.daily[i].temp.day;
    const nightTemp = data.daily[i].temp.night;
    wrapper.setAttribute('class', 'dailyTemp');

    time.innerHTML = curDate(i);
    temperature.innerHTML = `Temps: ${dayTemp} ${measure} / ${nightTemp} ${measure}`;
    humidity.innerHTML = `Humidity: ${data.daily[i].humidity}%`;
    wrapper.append(time, temperature, humidity);
    document.querySelector('.future').append(wrapper);
  }
}

export { getWeather };
