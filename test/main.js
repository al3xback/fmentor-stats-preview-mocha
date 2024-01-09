import assert from 'assert';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-stats-preview-mocha/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it("should have a title element with a class of 'card__title'", () => {
		const cardTitleEl = document.querySelector('.card__title');

		assert.ok(cardTitleEl);
	});

	it("should have a desc element with a class of 'card__desc'", () => {
		const cardDescEl = document.querySelector('.card__desc');

		assert.ok(cardDescEl);
	});

	it('should have a mark element in card title element', () => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardMarkEl = cardTitleEl.querySelector('mark');

		assert.ok(cardMarkEl);
	});
});
