customSelect('select');

const DateTime = easepick.DateTime;
      const bookedDates = [
          '2023-07-02',
          ['2023-07-06', '2023-07-11'],
          '2023-07-18',
          '2023-07-19',
          '2023-07-20',
          '2023-07-25',
          '2023-07-28',
      ].map(d => {
          if (d instanceof Array) {
            const start = new DateTime(d[0], 'YYYY-MM-DD');
            const end = new DateTime(d[1], 'YYYY-MM-DD');

            return [start, end];
          }

          return new DateTime(d, 'YYYY-MM-DD');
      });
      const picker = new easepick.create({
        lang: "ru-RU",
        element: document.getElementById('date'),
        css: [
          'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
          'https://easepick.com/css/demo_hotelcal.css',
        ],
        plugins: ['RangePlugin', 'LockPlugin'],
        RangePlugin: {
          tooltipNumber(num) {
            return num - 1;
          },
          locale: {
            one: 'night',
            other: 'nights',
          },
        },
        LockPlugin: {
          minDate: new Date(),
          minDays: 2,
          inseparable: true,
          filter(date, picked) {
            if (picked.length === 1) {
              const incl = date.isBefore(picked[0]) ? '[)' : '(]';
              return !picked[0].isSame(date, 'day') && date.inArray(bookedDates, incl);
            }

            return date.inArray(bookedDates, '[)');
          },
        }
});


// Скрипт для input'a 

const inputSubscribe = document.querySelector('.subscribe__input');
const label = document.querySelector('.subscribe__label');

inputSubscribe.addEventListener('input', () => {
	if (inputSubscribe.value.trim() !== '') {
		label.classList.add('subscribe__label--top');
	} else {
		label.classList.remove('subscribe__label--top');
	}
});

function checkCookies(){
  let cookieDate = localStorage.getItem('cookieDate');
  let cookieNotification = document.getElementById('cookie_notification');
  let cookieBtn = cookieNotification.querySelector('.cookie_accept');

  if( !cookieDate || (+cookieDate + 31536000000) < Date.now() ){
      cookieNotification.classList.add('show');
  } 

  cookieBtn.addEventListener('click', function(){
      localStorage.setItem( 'cookieDate', Date.now() );
      cookieNotification.classList.remove('show');
  })
}

checkCookies();