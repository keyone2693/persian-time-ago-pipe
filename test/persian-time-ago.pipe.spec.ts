var expect = require('chai').expect;
var sinon = require('sinon');
import {NgZone} from '@angular/core';
import {PersianTimeAgoPipe} from "../persian-time-ago.pipe";

class NgZoneMock {
	runOutsideAngular (fn: Function) {
		return fn();
	}
	run(fn: Function) {
		return fn();
	}
};

describe('persian-time-ago-pipe', () => {
	const now:Date = new Date();
	var clock:any;
	const oneSec = 1000;
	const oneMin = oneSec * 60;
	const oneHour = oneMin * 60;
	const oneDay = oneHour * 24;
	const oneMonth = oneDay * 30.416; // approximation 365/12
	beforeEach(() => {
		clock = sinon.useFakeTimers(now.getTime());
	});
	afterEach(() => {
		clock.restore();
	});
	describe('output tests', function () {
		let pipe = new TimeAgoPipe(null, new NgZoneMock() as NgZone);
		it('\'چند ثانیه قبل\' tests', () => {
			var pastDate = new Date();
			for (let i =0; i < 45; i++){
				clock.tick(oneSec);
				if (i < 44) {
					expect(pipe.transform(pastDate.toString())).to.equal('چند ثانیه قبل');
				}
			}
		});
		it('\'دقیقه ای پیش\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneSec * 45);
			for (let i =45; i < 89; i++){
				clock.tick(oneSec);
				if (i < 89){
					expect(pipe.transform(pastDate.toString())).to.equal('دقیقه ای پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('دقیقه ای پیش');
				}
			}
		});
		it('\'x دقیقه پیش\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneSec * 50);
			for (let i =1; i < 44; i++){
				clock.tick(oneMin);
				if (i < 44){
					expect(pipe.transform(pastDate.toString())).to.equal(i+1 + ' دقیقه پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal(i+1 + ' دقیقه پیش');
				}
			}
		});
		it('\'ساعتی پیش\' tests', () => {
			var pastDate = new Date();
			//set the time forward 45 mins
			clock.tick(oneMin * 45);
			for (let i =45; i < 120; i++){
				clock.tick(oneMin);
				if (i < 90){
					expect(pipe.transform(pastDate.toString())).to.equal('ساعتی پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('ساعتی پیش');
				}
			}
		});
		it('\'x ساعت پیش\' tests', () => {
			var pastDate = new Date();
			//set the time forward 50 mins
			clock.tick(oneMin * 50);
			for (let i = 1; i < 25; i++){
				clock.tick(oneHour);
				if (i < 22){
					expect(pipe.transform(pastDate.toString())).to.equal(i+1 + ' ساعت پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal(i+1 + ' ساعت پیش');
				}
			}
		});
		it('\'روزی پیش\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneHour * 22);
			for (let i = 22; i < 40; i++){
				clock.tick(oneHour);
				if (i < 36){
					expect(pipe.transform(pastDate.toString())).to.equal('روزی پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('روزی پیش');
				}
			}
		});
		it('\'x روز پیش\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneHour * 35);
			for (let i = 1; i < 30; i++){
				clock.tick(oneDay);
				if (i < 25){
					expect(pipe.transform(pastDate.toString())).to.equal(i+1 + ' روز پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal(i+1 + ' روز پیش');
				}
			}
		});
		it('\'a یک ماه پیش\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneDay * 25);
			for (let i = 25; i < 50; i++){
				clock.tick(oneDay);
				if (i < 45){
					expect(pipe.transform(pastDate.toString())).to.equal('یک ماه پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('یک ماه پیش');
				}
			}
		});
		it('\'x ماه پیش\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneDay * 43);
			for (let i = 1; i < 13; i++){
				clock.tick(oneMonth);
				if (i < 10){
					expect(pipe.transform(pastDate.toString())).to.equal(i +1 + ' ماه پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal(i +1 + ' ماه پیش');
				}
			}
		});
		it('\'یک سال پیش\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneDay * 345);
			for (let i = 345; i < 545; i++){
				clock.tick(oneDay);
				if (i < 545){
					expect(pipe.transform(pastDate.toString())).to.equal('یک سال پیش');
				} else {
					expect(pipe.transform(pastDate.toString())).not.to.equal('یک سال پیش');
				}
			}
		});
		it('\'x سال پیش\' tests', () => {
			var pastDate = new Date();
			clock.tick(oneMonth * 22);
			expect(pipe.transform(pastDate.toString())).to.equal(2 + ' سال پیش');
			clock.tick(oneMonth * 12);
			expect(pipe.transform(pastDate.toString())).to.equal(3 + ' سال پیش');
			clock.tick(oneMonth * 36);
			expect(pipe.transform(pastDate.toString())).to.equal(6 + ' سال پیش');
		});
	});
});