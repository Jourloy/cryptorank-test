import {Test} from "@nestjs/testing";
import { CurrencyService } from "./currency.service";

const moduleRef = Test.createTestingModule({
	providers: [CurrencyService],
}).compile();

describe(`CurrenctService`, () => {
	let service: CurrencyService;

	beforeAll(async () => {
		
		service = (await moduleRef).get<CurrencyService>(CurrencyService);
	});

	it(`should be defined`, () => {
		expect(service).toBeDefined();
	});

	/**
	 * Very important if 0.05 rounded to 0.1
	 */
	it(`should be rounded to 0.00000001`, () => {
		const num = service.calculate(1, 200000000, 1);
		expect(num).toBe(0.00000001);
	});
});
