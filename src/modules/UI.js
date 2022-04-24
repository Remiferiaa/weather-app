function elDetail(el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
}

function header() {
  const head = document.createElement('div');
  const wrap1 = document.createElement('div');
  const searchBoxTitle = document.createElement('label');
  const searchBox = document.createElement('input');
  const errorMsg = document.createElement('p');
  const celciusBtn = document.createElement('button');
  const fahrenBtn = document.createElement('button');

  head.setAttribute('class', 'header');
  wrap1.setAttribute('class', 'box');
  errorMsg.setAttribute('class', 'error');
  celciusBtn.innerHTML = '℃';
  fahrenBtn.innerHTML = '℉';
  searchBoxTitle.innerHTML = 'Search';

  searchBoxTitle.setAttribute('for', 'search');
  elDetail(searchBox, {
    type: 'text', id: 'search', name: 'search', autocomplete: 'off',
  });
  elDetail(celciusBtn, { class: 'tempBtn', id: 'celcius' });
  elDetail(fahrenBtn, { class: 'tempBtn', id: 'fahrenheit' });
  wrap1.append(searchBoxTitle, searchBox, errorMsg);
  head.append(wrap1, celciusBtn, fahrenBtn);
  return head;
}

function content() {
  const main = document.createElement('div');
  const currentDay = document.createElement('div');
  const forecast = document.createElement('div');

  main.setAttribute('class', 'content');
  currentDay.setAttribute('class', 'now');
  forecast.setAttribute('class', 'future');

  main.append(currentDay, forecast);
  return main;
}

function site() {
  const holder = document.createElement('div');
  holder.setAttribute('class', 'container');
  holder.append(header(), content());
  document.body.append(holder);
}

export { site };
