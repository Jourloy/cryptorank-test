import {Injectable, Logger} from "@nestjs/common";
import axios from "axios";

@Injectable()
export class CurrencyService {

	private readonly logger = new Logger(CurrencyService.name);

	private async getCoinsData() {
		try {
			const resp = await axios.get<ICoinResponse>(`${process.env.API_LINK}/coins/prices/`);
			if (resp.status === 200) return resp.data.data;
			return null;
		} catch(e) {
			this.logger.error(e);
			return null;
		}
	}

	public calculate(coin1: number, coin2: number, amount: number) {
		return Number((coin1 * amount / coin2).toFixed(8));
	}

	public async convert(fCoinName: string, sCoinName: string, amount: number) {
		const data = await this.getCoinsData();
		if (!data) return {error: `API_ERROR`};

		const fromCoin = data.filter(c => c.key === fCoinName)[0];
		const toCoin = data.filter(c => c.key === sCoinName)[0];

		if (!fromCoin || !toCoin) return {error: `Coin is not found`};

		const total = this.calculate(fromCoin.price, toCoin.price, amount);
		return {amount: amount, from: fCoinName, to: sCoinName, result: total};
	}
}


interface ICoinResponse {
	data: {
		key: string;
		price: number;
		volume: number;
	}[]
}