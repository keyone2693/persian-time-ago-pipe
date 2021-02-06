# persian-time-ago-pipe
[![Build Status](https://img.shields.io/appveyor/ci/keyone2693/imageresizer-aspnetcore.svg)](https://travis-ci.org/keyone2693/persian-time-ago-pipe) [![npm](https://img.shields.io/npm/v/persian-time-ago-pipe.svg)](https://www.npmjs.com/package/persian-time-ago-pipe) [![npm](https://img.shields.io/npm/dt/persian-time-ago-pipe.svg?maxAge=25920)](https://www.npmjs.com/package/persian-time-ago-pipe) [![GitHub issues](https://img.shields.io/github/issues/keyone2693/persian-time-ago-pipe.svg?maxAge=25920?style=plastic)](https://github.com/keyone2693/persian-time-ago-pipe/issues) [![npm](https://img.shields.io/npm/l/persian-time-ago-pipe.svg?maxAge=25920?style=plastic)](https://github.com/keyone2693/persian-time-ago-pipe/blob/master/LICENSE)


A really simple, lightweight Angular pipe for converting a date string into a time ago

## version
angular 5+


"now working with ivy and Angualr 9+ no problem :)"




|Time Range|Output|
|---|---|
|0 - 45 seconds             | چند ثانیه پیش      |
|45 - 90 seconds            | دقیقه ای پیش          |
|90 seconds - 45 minutes    | X دقیقه پیش         |
|45 - 90 minutes            | ساعتی پیش           |
|90 minutes - 22 hours      | X ساعت پیش           |
|22 - 36 hours              | روزی پیش              |
|36 hours - 25 days         | X روز پیش             |
|25 - 45 days               | یک ماه پیش            |
|45 - 345 days              | X ماه پیش           |
|345 - 545 days (1.5 years) | یک سال پیش            |
|546 days+                  | X سال پیش            |

## Installation
```npm install persian-time-ago-pipe --save```

## Usage
It can be imported into your angular project, as you would for any other library. 

In the @NgModule you want to use it in
```
import { PersianTimeAgoModule } from 'persian-time-ago-pipe';
```
add "PersianTimeAgoPipe" to your declarations
```
@NgModule({
	imports: [... ,PersianTimeAgoModule , ...]
})
```
---

In your component templates you can just do:
```
<span>{{your_date | persianTimeAgo}}</span>
```
where "your_date" is a local date as a "string", which could be parsed by the standard Js Date()
```
//in component
_dt = new Date();
//in html
<span>{{_dt.toString() | persianTimeAgo}}</span>
```

If this value is null or not parsable as a date, then the pipe will display nothing
