/**
 * It takes an object of coins available and an array of requests, and returns an array of coins that
 * can be given out, or null if there are not enough coins to satisfy all requests
 * @param {ICoins} coinsAvailable - an object that contains the number of coins available for each coin
 * type.
 * @param {string[]} requests - an array of strings, each string is a request for a coin.
 * @returns An array of strings.
 */
function rewards(coinsAvailable: ICoins, requests: string[]) {
	const coinMap: { [coin in string]: number } = {};
	let result: string[] = [];
	let remainingRequests: string[] = [];

	/**
	 * First, check all individual coins
	 */
	for (const request of requests) {
		const coins = request.split('/') as [string, string?];
		if (coins.length === 1) {
			if (coinsAvailable[coins[0]] > 0) {
				coinsAvailable[coins[0]]--;
				coinMap[coins[0]]++;
				result.push(coins[0]);
			} else {
				remainingRequests.push(request);
			}
		} else if (coins.length === 2) {
			if (coinsAvailable[coins[0]] > 0) {
				coinsAvailable[coins[0]]--;
				coinMap[coins[0]]++;
				result.push(coins[0]);
			} else if (coinsAvailable[coins[1]!] > 0) {
				coinsAvailable[coins[1]!]--;
				coinMap[coins[1]!]++;
				result.push(coins[1]!);
			} else {
				remainingRequests.push(request);
			}
		}
	}

	/**
	 * Return result if array was contain only individual coins
	 */
	if (remainingRequests.length === 0) return result;

	/**
	 * Process other coins
	 */
	for (const request of remainingRequests) {
		const coins = request.split('/') as [string, string];
		if (coinsAvailable[coins[0]] > 0 && coinsAvailable[coins[1]] > 0) {
			coinsAvailable[coins[0]]--;
			coinsAvailable[coins[1]]--;
			coinMap[coins[0]]++;
			coinMap[coins[1]]++;
			result.push(coins[0]);
		} else if (coinsAvailable[coins[1]] > 0 && coinsAvailable[coins[0]] === 0) {
			coinsAvailable[coins[1]]--;
			coinMap[coins[1]]++;
			result.push(coins[1]);
		} else if (coinsAvailable[coins[0]] > 0 && coinsAvailable[coins[1]] === 0) {
			coinsAvailable[coins[0]]--;
			coinMap[coins[0]]++;
			result.push(coins[0]);
		} else {
			return null;
		}
	}

	return result;
}

/**
 * For check code above
 */
console.log(
	rewards({ ETH: 4, TRON: 5, MATIC: 1 }, [
		`ETH`,
		`MATIC`,
		`ETH/MATIC`,
		`TRON/ETH`,
		`TRON/MATIC`,
		`MATIC`,
		`MATIC`,
	])
); // Output: null

console.log(
	rewards({ ETH: 4, TRON: 5, MATIC: 1 }, [
		`ETH`,
		`ETH`,
		`ETH/TRON`,
		`TRON/ETH`,
		`TRON/MATIC`,
		`TRON`,
		`MATIC`,
	])
); // Output ['ETH', 'ETH', 'ETH', 'TRON', 'TRON', 'TRON', 'MATIC']

/**
 * You can use any coin name
 */
interface ICoins {
	[coinName: string]: number;
}
