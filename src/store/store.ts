import { defineStore } from 'pinia';
import type { History, WeatherData, Elements } from '@/types';
import axios from 'axios';
import moment from 'moment';
moment.updateLocale('zh-tw', {
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
});

export const useStore = defineStore('store', {
  state: () => ({
    history: <History[]>[],
    weatherData: {} as WeatherData,
    elements: <Elements[]>[], // 一週天氣元素按照日期排序集合儲存於陣列中
  }),
  actions: {
    addHistory(city: string, region: string, dataId: string) {
      // 檢查紀錄是否已存在相同的地區
      const exist = this.history.find(
        (r) => r.city === city && r.region === region
      );
      if (!exist) {
        // 如果不存在，則將地區推入紀錄陣列的開頭
        this.history.unshift({ city, region, dataId });
        // 如果紀錄超過6筆，則移除最後一筆
        if (this.history.length > 6) {
          this.history.pop();
        }
      }
    },
    deleteFromHistory(index: any) {
      if (this.history.length > 0) {
        this.history.splice(index, 1);
      }
    },
    async fetchWeather(city: string, region: string, dataId: string) {
      try {
        const response = await axios.get(
          `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId}?`,
          {
            params: {
              Authorization: import.meta.env.VITE_API,
              locationName: region,
              elementName: 'PoP12h,T,RH,Wx',
            },
          }
        );
        // 由API獲取的指定天氣因子資料存進data
        const data =
          response.data.records.locations[0].location[0].weatherElement;
        this.weatherData.cityName = city;
        this.weatherData.regionName = region;
        //console.log(data);
        if (data) {
          // 每天開始時間的陣列
          const dateArr = data[0].time.map((item: any) => item.startTime);
          // 降雨機率陣列
          const popArr = data[0].time.map(
            (item: any) => item.elementValue[0].value
          );
          // 平均氣溫陣列
          const tArr = data[1].time.map(
            (item: any) => item.elementValue[0].value
          );
          // 平均相對濕度陣列
          const rhArr = data[2].time.map(
            (item: any) => item.elementValue[0].value
          );
          // 天氣現象陣列
          const wxArr = data[3].time.map(
            (item: any) => item.elementValue[0].value
          );

          // 排除陣列第一筆資料:因查詢時間區段跨夜(After 18:00)造成第一筆為過時資料
          dateArr.length > 14 ? dateArr.shift() : dateArr;
          popArr.length > 14 ? popArr.shift() : popArr;
          tArr.length > 14 ? tArr.shift() : tArr;
          rhArr.length > 14 ? rhArr.shift() : rhArr;
          wxArr.length > 14 ? wxArr.shift() : wxArr;

          // 使用迭代方法將陣列轉換為物件儲存於陣列中
          for (let i = 0; i < 7; i++) {
            // 格式化星期幾、日期
            const day = moment(dateArr[i * 2]);
            const date = dateArr.map((d: string) =>
              d.split(' ')[0].split('-').slice(1).join('/')
            );
            this.elements[i] = {
              dayOfWeek: day.locale('zh-tw').format('dddd'),
              date: date[i * 2],
              pop: [popArr[i * 2], popArr[i * 2 + 1]],
              t: [tArr[i * 2], tArr[i * 2 + 1]],
              rh: [rhArr[i * 2], rhArr[i * 2 + 1]],
              wx: [wxArr[i * 2], wxArr[i * 2 + 1]],
            };
          }
          //console.log(this.elements);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  persist: true,
});
