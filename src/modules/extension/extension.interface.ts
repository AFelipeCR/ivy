import { Type } from '@nestjs/common';

export interface ExtensionDefinition {
  module: Type<any>;
}