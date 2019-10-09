import { createParamDecorator } from '@nestjs/common';

export const Token = createParamDecorator(
  (_, request) => request.headers.authorization,
);
