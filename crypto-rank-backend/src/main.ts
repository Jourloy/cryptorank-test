import {NestFactory} from "@nestjs/core";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {AppModule} from "./app.module";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle(`CryptoRank Backend 	`)
		.setDescription(`API description`)
		.setVersion(`1.0.0`)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(`api`, app, document);

	await app.listen(3000);
}
bootstrap();
