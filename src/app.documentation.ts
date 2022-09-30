import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

/**
 * Auto-generates api documentation using @nestjs/swagger.
 * @param app  : instance
 */
const setupDocumentation = (app: INestApplication) => {
    const options = new DocumentBuilder()
      .setTitle('GroBackend API')
      .setDescription(
        'Web api offering data to the Gro mobile front application.',
      )
      .setVersion('v1.0')
      .addBearerAuth()
      // .setBasePath("api") deprecated
      .build();
    const document = SwaggerModule.createDocument(app, options);
    // writes the generated specs file
    // fs.writeFileSync("./src/main-swagger-spec.json", JSON.stringify(document));
    SwaggerModule.setup('api/doc', app, document);
  };
  export default setupDocumentation;