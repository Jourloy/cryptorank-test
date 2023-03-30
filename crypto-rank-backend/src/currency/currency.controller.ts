import {Controller, Get, Query, Res} from "@nestjs/common";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Response} from "express";
import {CurrencyService} from "./currency.service";
import {ConvertDto} from "./dto/convert.dto";

@ApiTags(`currency`)
@Controller(`currency`)
export class CurrencyController {
	constructor(private readonly currencyService: CurrencyService) {}

	@Get(`/convert`)
	@ApiOperation({summary: `Convert one currency to other`})
	@ApiResponse({status: 400, description: `Invalid request, check error in response`})
	@ApiResponse({status: 200, description: `OK`})
	async test(@Query() q: ConvertDto, @Res() response: Response) {
		if (q.amount && isNaN(Number(q.amount))) {
			response.status(400).json({error: `Amount is not a number`});
		} else if (q.amount && Number(q.amount) === 0) {
			response.status(400).json({error: `Amount is should be a greater than 0`});
		} else if (q.from === `` || (q.to && q.to === ``)) {
			response.status(400).json({error: `Name of coin is can not be empty`});
		} else {
			const sCoin = q.to ? q.to.toLowerCase() : `tether`;
			const amount = q.amount ? Number(q.amount) : 1;
			const state = await this.currencyService.convert(
				q.from.toLowerCase(),
				sCoin,
				amount
			);
			response.status(state.error ? 400 : 200).json(state);
		}
	}
}
