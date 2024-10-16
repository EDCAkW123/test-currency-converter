import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  rubAmount: number = 0;
  exchangeRates: any = {};
  convertedValues: any = {};
  currencyList = ['USD', 'EUR', 'CNY', 'JPY', 'INR'];

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.getRates();
  }

  getRates(): void {
    this.currencyService.getExchangeRates('RUB').subscribe(
      data => {
        this.exchangeRates = data.conversion_rates;
        console.log('Получены курсы обмена:', this.exchangeRates);
        this.convert(); // Вызов конвертации после получения курсов
      },
      error => {
        console.error('Ошибка при получении курсов обмена:', error);
      }
    );
  }

  convert(): void {
    console.log('Вызов convert() с rubAmount:', this.rubAmount);
    this.rubAmount = Number(this.rubAmount); // Приведение к числу
    if (this.exchangeRates) {
      this.convertedValues = {};
      for (let currency of this.currencyList) {
        const rate = this.exchangeRates[currency];
        if (rate) {
          this.convertedValues[currency] = this.rubAmount * rate;
          console.log(`Конвертация: ${this.rubAmount} RUB = ${this.convertedValues[currency]} ${currency}`);
        } else {
          console.warn(`Курс для ${currency} не найден.`);
        }
      }
    } else {
      console.warn('Курсы обмена не определены.');
    }
  }
}

